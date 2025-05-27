<script setup>
import { onMounted } from 'vue'
import { settingsStore } from '@/store/settings'

const store = settingsStore()
</script>

<template>
    <div class="app">
        <label for="counters">
            Counter:
            <input type="number" name="counters" id="input-counter" v-model="store.counters">
        </label>
        <label for="values">
            Values:
            <input type="number" name="values" id="input-value" v-model="store.counterValue">
        </label>
    </div>
</template>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
}
</style>