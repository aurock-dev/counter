<script setup>
import { ref, onMounted } from 'vue'
import { settingsStore } from '@/store/settings';
import Counter from '@/components/Counter.vue';

const store = settingsStore()
const counters = ref([])

const addCounter = () => {
    counters.value.push(counters.value.length + 1)
}

const deleteCounter = (id) => {
    counters.value = counters.value.filter(counterId => counterId !== id)
}

onMounted(async () => {
    counters.value = Array.from({ length: store.counterNumber }, (_, i) => i + 1)
})

</script>

<template>
    <div class="app">
        <Counter v-for="id in counters" :key="id" :id="id" @delete="deleteCounter" />
    </div>
    <button class="add__counter" @click="addCounter">+</button>
</template>

<style scoped>
.app {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
}

.add__counter {
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 100%;
    width: 1.5em;
    height: 1.5em;
    font-size: 2em;
    padding-bottom: 8px;
}
</style>