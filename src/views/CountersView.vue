<script setup>
import { onMounted, computed } from 'vue'
import { settingsStore } from '@/store/settings';
import Counter from '@/components/Counter.vue';

const store = settingsStore()

const layoutClass = computed(() => {
    return store.columnCount === 2 ? 'two-col' : 'one-col'
})

onMounted(async () => {
    store.counters = Array.from({ length: store.counters.length }, (_, i) => i + 1)
})

</script>

<template>
    <div :class="['app', layoutClass]">
        <Counter v-for="id in store.counters" :key="id" :id="id" />
    </div>
</template>

<style scoped>
.app.one-col {
    height: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}

.app.two-col {
    height: calc(100vh - var(--header-height));
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
}

.add__counter {
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 100%;
    width: 3em;
    height: 3em;
    padding: 0;
}
</style>