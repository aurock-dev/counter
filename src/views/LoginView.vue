<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('jeremy24200@gmail.com')
const password = ref('passwordtest')

const login = async () => {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (authError) {
        error.value = authError.message
    } else {
        console.log('Connecté !', data)
        auth.login()
        router.push('/')
    }
}
</script>

<template>
    <div class="app">
        <button @click="login">login</button>
    </div>
</template>

<style scoped>
.app {
    display: flex;
    width: 100%;
    height: 100dvh;
    align-items: center;
    justify-content: center;
}
</style>