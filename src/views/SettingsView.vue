<script setup>
import { useSettingsStore } from '@/store/settings'

const store = useSettingsStore()
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