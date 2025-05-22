<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import { supabase } from '@/supabase'

const test = ref([])
const test_auth = ref([])
const errorMsg = ref(null)
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
    }
}

const logout = async () => {
    await supabase.auth.signOut()
}

onMounted(async () => {
    // login()
    // logout()
    let { data: test, error } = await supabase
        .from('test')
        .select('*')

    let { data: test_auth, error_2 } = await supabase
        .from('test_auth')
        .select('*')

    if (error) {
        errorMsg.value = error.message
    }
    else if (error_2) {
        errorMsg.value = error_2.message
    }
    else {
        test.value = test
        test_auth.value = test_auth
        console.log(test.value)
        console.log(test_auth.value)
    }
})
</script>

<template>
    <Header />
    <RouterView />
</template>

<style scoped></style>