<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'

const test = ref([])
const test_auth = ref([])
const errorMsg = ref(null)
const email = ref('jeremy24200@gmail.com')
const password = ref('passwordtest')
const signedUrl = ref(null)
const uploadUrl = ref(null)
const user = ref(null)

const getDb = async () => {
    let { data, error } = await supabase
        .from('test')
        .select('*')

    console.log(data)
}

const sendDb = async () => {
    const { data, error } = await supabase
        .from('test_auth')
        .insert([
            {
                desc: 'test envoi',
            }
        ])
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

// onMounted(async () => {
//     const { data } = await supabase.auth.getUser()
//     user.value = data.user

//     supabase.auth.onAuthStateChange((_event, session) => {
//         user.value = session?.user ?? null
//     })
// })
</script>

<template>
    <div>
        <img :src="signedUrl" alt="Image protégée" />
        <button @click="getImage">getImage</button>
        <button @click="getDb">getDb</button>
        <button @click="sendDb">sendDb</button>
        <input type="file" @change="uploadImage" />
    </div>
</template>

<style scoped></style>