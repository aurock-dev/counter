import { defineStore } from "pinia";
import { ref } from 'vue'

export const settingsStore = defineStore('settings', () => {
    const counters = ref([])
    const counterValue = ref(20)
    const columnCount = ref(1)

    function updateCounter(id, data) {
        const index = counters.value.findIndex(c => c.id === id)
        if (index !== -1) {
            counters.value[index] = { ...counters.value[index], ...data }
        }
    }

    function deleteCounter(id) {
        counters.value = counters.value.filter(c => c.id !== id)
    }

    return {
        counters,
        counterValue,
        columnCount,
        updateCounter,
        deleteCounter
    }
},
    {
        persist: true
    })