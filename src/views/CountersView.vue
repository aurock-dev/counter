<script setup>
import { ref, onMounted, computed } from 'vue'
import { settingsStore } from '@/store/settings';
import Counter from '@/components/Counter.vue';
import { Plus } from 'lucide-vue-next';

const store = settingsStore()
const counters = ref([])

const addCounter = () => {
    counters.value.push(counters.value.length + 1)
    store.counters++
}

const deleteCounter = (id) => {
    counters.value = counters.value.filter(counterId => counterId !== id)
    store.counters--
}

const layoutClass = computed(() => {
    return store.columnCount === 2 ? 'two-col' : 'one-col'
})

onMounted(async () => {
    counters.value = Array.from({ length: store.counterNumber }, (_, i) => i + 1)
    store.counters = store.counterNumber
})

</script>

<template>
    <div :class="['app', layoutClass]">
        <Counter v-for="id in counters" :key="id" :id="id" @delete="deleteCounter" />
    </div>
    <button class="add__counter" @click="addCounter">
        <Plus />
    </button>
</template>

<style scoped>
.app.one-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}

.app.two-col {
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