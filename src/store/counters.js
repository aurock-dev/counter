import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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

    const winnerGradient = computed(() => {
        if (!counters.value.length) return 'var(--clr-grey-500)';

        const max = Math.max(...counters.value.map(c => c.value));
        const winners = counters.value.filter(c => c.value === max);

        if (winners.length === 1) {
            return winners[0].color;
        }

        const gradientColors = winners.map(w => w.color).join(', ');
        return `linear-gradient(90deg, ${gradientColors})`;
    });

    return {
        counters,
        createCounter,
        updateCounter,
        deleteCounter,
        winnerGradient
    };
}, {
    persist: true
});
