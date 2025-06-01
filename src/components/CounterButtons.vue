<script setup>
import { computed } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { useCountersStore } from '@/store/counters'

const props = defineProps({
    id: Number
})

const counters = useCountersStore()
const currentCounter = computed(() => {
    return counters.counters.find(c => c.id === props.id)
})
const currentColorButton = computed(() => currentCounter.value.color.replace('500', '600'))

const increment = () => {
    counters.updateCounter(props.id, { count: currentCounter.value.count + 1 })
}

const decrement = () => {
    counters.updateCounter(props.id, { count: currentCounter.value.count - 1 })
}
</script>

<template>
    <div class="counter__buttons">
        <button class="counter__button" @click="decrement" :style="{ backgroundColor: currentColorButton }">
            <Minus />
        </button>
        <p class="counter__value">{{ currentCounter.count }}</p>
        <button class="counter__button" @click="increment" :style="{ backgroundColor: currentColorButton }">
            <Plus />
        </button>
    </div>
</template>

<style scoped>
.counter__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .counter__button {
        width: 5em;
        height: 100%;
        padding: 0;
        gap: 0;
        border-radius: 0;
        box-shadow: none;
    }

    .counter__value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--clr-white);
    }
}
</style>