import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const columnCount = ref(1)

    return {
        columnCount,
    }
},
    {
        persist: true
    })