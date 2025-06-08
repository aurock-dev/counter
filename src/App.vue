<script setup>
import { RouterView } from 'vue-router'
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import Footer from '@/components/Footer.vue';

const settings = useSettingsStore()
const counters = useCountersStore()

</script>

<template>
    <div :style="settings.optionWinnerColor === 2 ? { background: counters.winnerGradient } : {}">
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>