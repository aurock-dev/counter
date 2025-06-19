<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'
import { X } from 'lucide-vue-next';

const props = defineProps({
    visible: Boolean
})
const emit = defineEmits(['close'])

const loading = ref(true)
const htmlContent = ref('')

const changelogUrl = 'https://raw.githubusercontent.com/aurock-dev/counter/dev/CHANGELOG.md'

const fetchMarkdown = async () => {
    loading.value = true
    try {
        const response = await fetch(changelogUrl)
        const markdown = await response.text()
        htmlContent.value = marked(markdown)
    } catch (error) {
        htmlContent.value = '<p>Erreur de chargement du changelog.</p>'
    } finally {
        loading.value = false
    }
}

watch(() => props.visible, (newVal) => {
    if (newVal) {
        fetchMarkdown()
    }
})
</script>

<template>
    <div v-if="visible">
        <div class="overlay" @click.self="emit('close')">
            <div class="modal">
                <h2>Changelog</h2>
                <div v-if="loading">Chargement...</div>
                <div v-else v-html="htmlContent"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(8px);
}

.modal {
    background: white;
    padding: 5px 10px;
    border-radius: 8px;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    width: 90%;
    position: relative;
}
</style>
