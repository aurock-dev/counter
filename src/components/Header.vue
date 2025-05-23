<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()

const logout = async () => {
    await supabase.auth.signOut()
    console.log('Déconnecté !')
    auth.logout()
    router.push('/login')
}
</script>

<template>
    <div class="header">
        <div class="header__links">
            <RouterLink class="header__link" to="/">Counters</RouterLink>
            <RouterLink class="header__link" to="/settings">Settings</RouterLink>
            <RouterLink class="header__link" to="/supabase">Supabase</RouterLink>
            <RouterLink class="header__link" to="/chart">Chart</RouterLink>
        </div>
        <button class="header__button" @click="logout">Logout</button>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2px 5px;
    background-color: #022252;
    color: #fff;

    .header__links {
        display: flex;
        gap: 20px;

        .header__link {
            color: #d8d8d8;
            text-decoration: none;
        }

        .header__link.router-link-active {
            color: #fff;
            font-weight: bold;
        }
    }

    .header__button {
        background: none;
        border: none;
        color: #d8d8d8;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        text-decoration: none;
        padding: 0;
    }

    .header__button:hover {
        color: #fff;
    }
}
</style>