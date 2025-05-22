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
const signedUrl = ref(null)
const uploadUrl = ref(null)
const user = ref(null)

const login = async () => {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    const user = supabase.auth.getUser()

    if (authError) {
        error.value = authError.message
    } else {
        console.log('Connecté !', data)
    }
}

const logout = async () => {
    await supabase.auth.signOut()
    console.log('Déconnecté !')
}

const getImage = async () => {
    const { data: test_bucket, error_3 } = await supabase
        .storage
        .from('test')
        .createSignedUrl('images/test_480.png', 60)

    console.log(test_bucket)

    if (!error_3) {
        console.log('ok')
        signedUrl.value = test_bucket.signedUrl
        console.log('URL temporaire :', signedUrl)
    }
}

const uploadImage = async () => {
    const file = event.target.files[0]
    if (!file) return
    const filePath = `uploads/${Date.now()}-${file.name}`

    const { dataUser } = await supabase.auth.getUser()
    user.value = dataUser.user
    if (!user.data.user) {
        console.log("Non connecté, upload impossible.")
        return
    }

    const { data, error } = await supabase.storage
        .from('test')
        .upload(filePath, file)
}

onMounted(async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user

    supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null
    })
})

</script>

<template>
    <button v-if="!user" @click="login">login</button>
    <span v-else>
        <img :src="signedUrl" alt="Image protégée" />
        <button @click="logout">logout</button>
        <button @click="getImage">getImage</button>
        <input type="file" @change="uploadImage" />
    </span>
    <Header />
    <RouterView />
</template>

<style scoped></style>