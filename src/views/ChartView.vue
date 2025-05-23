<script setup>
import { ref, computed } from 'vue'
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

</script>

<template>
    <div>
        <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
        <button @click="shuffleData">Shuffle</button>
    </div>
</template>

<style scoped></style>