import { defineStore } from "pinia";
import { ref } from 'vue'

export const settingsStore = defineStore('settings', () => {
    const counters = ref(0)
    const counterNumber = ref(2)
    const counterValue = ref(20)
    const columnCount = ref(1)

    return {
        counters,
        counterNumber,
        counterValue,
        columnCount
    }
},
    {
        persist: true
    })
