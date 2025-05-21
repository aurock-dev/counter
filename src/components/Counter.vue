<script setup>
import { ref } from 'vue'
import { RotateCwSquare, Trash2 } from 'lucide-vue-next'

const props = defineProps({
    id: Number
})
const emit = defineEmits(['delete'])

const counter = ref(0)
const counterName = ref('Counter name')
const isEditing = ref(false)
const rotation = ref(0)

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

</script>

<template>
    <div class="counter" :style="{ transform: `rotate(${rotation}deg)` }">
        <div class="counter__delete" @click="handleDelete">
            <Trash2 color="red" />
        </div>
        <div class="counter__rotate" @click="rotate">
            <RotateCwSquare />
        </div>
        <div class="counter__header">
            <div class="counter__name" @click="startEditing" v-if="!isEditing">
                <p class="counter__name--p">{{ counterName }}</p>
            </div>
            <input v-else v-model="counterName" @blur="stopEditing" @keyup.enter="stopEditing" type="text" />
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

    .counter__delete {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        padding: 4px;
        cursor: pointer;
    }

    .counter__rotate {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        padding: 4px;
        cursor: pointer;
    }

    .counter__header {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        width: 70%;
        padding: 0 10px;

        .counter__name {
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .counter__name--p {
                text-overflow: ellipsis;
            }
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