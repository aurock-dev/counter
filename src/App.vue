<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import { supabase } from '@/supabase'

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { shuffle } from 'lodash'


Chart.register(...registerables);

const data = ref([30, 40, 60, 70, 5])
const doughnutRef = ref(null)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart',
        },
    },
}

const testData = computed(() => ({
    labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    datasets: [
        {
            data: data.value,
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
    ],
}))

function shuffleData() {
  data.value = shuffle(data.value)
}

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
        <button @click="getDb">getDb</button>
        <button @click="sendDb">sendDb</button>
        <input type="file" @change="uploadImage" />
    </span>
    <div>
        <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
        <button @click="shuffleData">Shuffle</button>
    </div>
    <Header />
    <RouterView />
</template>

<style scoped></style>