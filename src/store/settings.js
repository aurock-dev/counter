import { defineStore } from "pinia";
import { ref } from 'vue'

export const settingsStore = defineStore('settings', () => {
    const counters = ref(2)
    const values = ref(20)

    return {
        counters,
        values
    }
})