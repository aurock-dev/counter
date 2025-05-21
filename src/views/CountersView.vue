<script setup>
import { ref } from 'vue'
import Counter from '../components/Counter.vue';

const counters = ref([1])

const addCounter = () => {
    counters.value.push(counters.value.length + 1)
}

const deleteCounter = (id) => {
    counters.value = counters.value.filter(counterId => counterId !== id)
}

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