<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import { useAuthStore } from '@/store/auth'

const store = useAuthStore()

</script>

<template>
    <Header v-if="store.isAuthenticated" />
    <RouterView />
</template>

<style scoped></style>