import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const columnCount = ref(1)

    function setColumns() {
        columnCount.value = 2
    }

    function setRows() {
        columnCount.value = 1
    }

    return {
        columnCount,
        setColumns,
        setRows
    }
},
    {
        persist: true
    })