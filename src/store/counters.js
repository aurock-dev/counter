import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountersStore = defineStore('counters', () => {
    const counters = ref([]);

    function createCounter() {
        const newId = counters.value.length
            ? Math.max(...counters.value.map(c => c.id)) + 1
            : 1;

        counters.value.push({
            id: newId,
            value: 0,
            name: `Counter ${newId}`,
            color: 'var(--clr-grey-500)',
            rotated: false,
        });
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
        createCounter,
        updateCounter,
        deleteCounter
    };
}, {
    persist: true
});
