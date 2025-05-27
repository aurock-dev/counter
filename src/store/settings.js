import { defineStore } from "pinia";
import { ref } from 'vue'

export const settingsStore = defineStore('settings', () => {
    const counters = ref([])
    const counterValue = ref(20)
    const columnCount = ref(1)

    return {
        counters,
        counterValue,
        columnCount
    }
},
    {
        persist: true
    })
