import { defineStore } from "pinia";
import { ref } from 'vue'

export const settingsStore = defineStore('settings', () => {
    const counterNumber = ref(2)
    const counterValue = ref(20)

    return {
        counterNumber,
        counterValue,
    }
},
{
    persist: true
})
