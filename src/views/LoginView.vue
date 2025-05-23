<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')

const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (data.user != null) {
        console.log('Connecté !', data)
        auth.login()
        router.push('/')
    } else {
        console.log('Connexion refusée !', data)
    }
}
</script>

<template>
    <div class="login">
        <div class="login__credentials">
            <label for="email">
                Mail :
                <input type="email" name="email" id="email" v-model="email">
            </label>
            <label for="password">
                Password :
                <input type="password" name="password" id="password" v-model="password">
            </label>
        </div>
        <div class="login__buttons">
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    height: 100dvh;
    align-items: center;
    justify-content: center;

    .login__credentials {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
    }

    .login__buttons {
        display: flex;
        gap: 10px;
    }
}
</style>