<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useCountersStore } from '@/store/counters';

const counters = useCountersStore() 
</script>

<template>
    <div :style="{ background: counters.winnerGradient }">
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>