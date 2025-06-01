<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import Counter from '@/components/Counter.vue';

const settings = useSettingsStore()
const counters = useCountersStore()

const layoutClass = computed(() => {
    return settings.columnCount === 2 ? 'two-col' : 'one-col'
})
</script>

<template>
    <div :class="['app', layoutClass]">
        <Counter v-for="counter in counters.counters" :key="counter.id" :id="counter.id" />
    </div>
</template>

<style scoped>
.app.one-col {
    height: calc(100vh - var(--header-height) - var(--footer-height));
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow: auto;
}

.app.two-col {
    height: calc(100vh - var(--header-height) - var(--footer-height));
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
    overflow: auto;
}

.add__counter {
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 100%;
    width: 3em;
    height: 3em;
    padding: 0;
}
</style>