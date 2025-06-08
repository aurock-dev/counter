import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCountersStore = defineStore('counters', () => {
    const counters = ref([])
    const mostPointFirst = ref(true)
    const colorList = ref([
        'var(--clr-red-500)',
        'var(--clr-blue-500)',
        'var(--clr-yellow-500)',
        'var(--clr-purple-500)',
        'var(--clr-green-500)',
        'var(--clr-orange-500)',
    ])

    function createCounter() {
        const newId = counters.value.length
            ? Math.max(...counters.value.map(c => c.id)) + 1
            : 0;

        const color = colorList.value[newId] ?? 'var(--clr-grey-500)';

        counters.value.push({
            id: newId,
            count: 0,
            name: `Player ${newId}`,
            color: color,
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

    function mostPointWin() {
        mostPointFirst.value = true
    }

    function leastPointWin() {
        mostPointFirst.value = false
    }

    const winnerGradient = computed(() => {
        let winners = [];

        if (!counters.value.length) return 'var(--clr-grey-500)';

        if (mostPointFirst.value) {
            const max = Math.max(...counters.value.map(c => c.count));
            winners = counters.value.filter(c => c.count === max);
        }
        else {
            const min = Math.min(...counters.value.map(c => c.count));
            winners = counters.value.filter(c => c.count === min);
        }

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
        winnerGradient,
        colorList,
        mostPointFirst,
        mostPointWin,
        leastPointWin
    };
}, {
    persist: true
});
