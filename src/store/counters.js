import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountersStore = defineStore('counters', () => {
    const counters = ref([]);

    function addCounter(counter) {
        counters.value.push(counter);
    }

    function updateCounter(id, data) {
        const index = counters.value.findIndex(c => c.id === id);
        if (index !== -1) {
            counters.value[index] = {
                ...counters.value[index],
                ...data
            };
        }
    }

    function deleteCounter(id) {
        counters.value = counters.value.filter(c => c.id !== id);
    }

    return {
        counters,
        addCounter,
        updateCounter,
        deleteCounter
    };
}, {
    persist: true
});
