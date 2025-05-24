<script setup>
import { ref, onMounted } from 'vue'
import { RotateCwSquare, Trash2, EllipsisVertical, Check } from 'lucide-vue-next'
import { settingsStore } from '@/store/settings'

const props = defineProps({
    id: Number
})
const emit = defineEmits(['delete'])

const store = settingsStore()
const counter = ref(0)
const counterName = ref('Counter name')
const isEditing = ref(false)
const rotation = ref(0)
const optionsState = ref(false)

const increment = () => {
    counter.value++
}

const decrement = () => {
    counter.value--
}

const startEditing = () => {
    isEditing.value = true
}

const stopEditing = () => {
    isEditing.value = false
}

const handleDelete = () => {
    emit('delete', props.id)
}

const rotate = () => {
    rotation.value += 180
    if (rotation.value > 180) {
        rotation.value = 0
    }
}

const toggleOptions = () => {
    optionsState.value = !optionsState.value
}

onMounted(() => {
    counter.value = store.counterValue
})

</script>

<template>
    <div class="counter" :style="{ transform: `rotate(${rotation}deg)` }">
        <div class="counter__header">
            <div v-if="!isEditing" class="counter__option" @click="toggleOptions">
                <EllipsisVertical />
            </div>
            <div v-if="optionsState" class="counter__options">
                <div @click="rotate">
                    <RotateCwSquare />
                </div>
                <div @click="handleDelete">
                    <Trash2 color="red" />
                </div>
            </div>
            <template v-if="!optionsState">
                <div v-if="!isEditing" class="counter__name" @click="startEditing">
                    <p class="counter__name--p">{{ counterName }}</p>
                </div>
                <div v-if="isEditing" class="counter__input">
                    <input v-model="counterName" type="text" @keyup.enter="stopEditing" />
                    <Check @click="stopEditing" />
                </div>
            </template>
        </div>
        <div class="counter__buttons">
            <button class="counter__button" @click="decrement">-</button>
            <p class="counter__value">{{ counter }}</p>
            <button class="counter__button" @click="increment">+</button>
        </div>
    </div>
</template>

<style scoped>
.counter {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 250px;
    width: 100%;
    padding: 10px;
    align-items: center;
    border-radius: 5px;
    background-color: #dbdbdb;



    .counter__header {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        width: 100%;

        .counter__option {
            display: flex;
        }

        .counter__options {
            display: flex;
            gap: 10px;
            width: 100%;
        }

        .counter__options>div {
            display: flex;
        }

        .counter__name {
            width: 100%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .counter__name--p {
                text-overflow: ellipsis;
            }
        }

        .counter__input {
            display: flex;
            gap: 5px;
        }
    }

    .counter__buttons {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .counter__button {
            min-width: 3em;
        }

        .counter__value {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>