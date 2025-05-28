<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { supabase } from '@/supabase'

const test = ref([])
const test_auth = ref([])
const errorMsg = ref(null)
const email = ref('')
const password = ref('')
const signedUrl = ref(null)
const uploadUrl = ref(null)
const user = ref(null)
const intervalId = ref(null)

const startSending = () => {
    if (!intervalId.value) {
        intervalId.value = setInterval(sendDb, 1000)
    }
}

const stopSending = () => {
    clearInterval(intervalId.value)
    intervalId.value = null
    console.log('staup')
}

const getDb = async () => {
    let { data, error } = await supabase
        .from('test_auth')
        .select('*')

    console.log(data)
}

const sendDb = async () => {
    console.log('sapar')
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

const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const filePath = `uploads/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    user.value = data?.user;

    if (!data?.user) {
        console.log("Non connecté, upload impossible.");
        return;
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('test')
        .upload(filePath, file);

    if (uploadError) {
        console.error("Erreur upload:", uploadError);
    } else {
        console.log("Upload réussi:", uploadData);
    }
}

onBeforeUnmount(() => {
    stopSending()
})
</script>

<template>
    <div>
        <img :src="signedUrl" alt="Image protégée" />
        <button @click="getImage">getImage</button>
        <button @click="getDb">getDb</button>
        <button @click="sendDb">sendDb</button>
        <button @click="startSending">Start loop</button>
        <button @click="stopSending" v-if="intervalId">Stop loop</button>
        <input type="file" @change="uploadImage" />
    </div>
</template>

<style scoped></style>