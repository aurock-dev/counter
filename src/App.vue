<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import { useCountersStore } from '@/store/counters';

const counters = useCountersStore() 
</script>

<template>
    <div :style="{ background: counters.winnerGradient }">
        <Header />
        <RouterView />
    </div>
</template>

<style scoped></style>