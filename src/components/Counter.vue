<script setup>
import { ref, computed } from 'vue'
import { Trash2, EllipsisVertical, Check, Minus, Plus, RotateCw, Circle } from 'lucide-vue-next'
import { settingsStore } from '@/store/settings'

const props = defineProps({
    id: Number
})

const store = settingsStore()
const isEditing = ref(false)
const optionsState = ref(false)

const colorList = [
    'var(--clr-red-500)',
    'var(--clr-blue-500)',
    'var(--clr-yellow-500)',
    'var(--clr-purple-500)',
    'var(--clr-green-500)',
    'var(--clr-orange-500)',
]

const counter = computed(() => currentCounter.value.value)
const counterName = computed({
    get: () => currentCounter.value?.name ?? 'Unnamed',
    set: (val) => {
        store.updateCounter(props.id, { name: val })
    }
})
const currentColor = computed(() => currentCounter.value.color)
const rotated = computed(() => currentCounter.value.rotated)

const currentCounter = computed(() => {
    return store.counters.find(c => c.id === props.id) || { value: 0, name: '', color: colorList[0], rotated: false }
})

const increment = () => {
    store.updateCounter(props.id, { value: counter.value + 1 })
}

const decrement = () => {
    store.updateCounter(props.id, { value: counter.value - 1 })
}

const startEditing = () => {
    isEditing.value = true
}

const stopEditing = () => {
    store.updateCounter(props.id, { name: counterName.value })
    isEditing.value = false
}

const deleteCounter = () => {
    store.deleteCounter(props.id)
}

const rotate = () => {
    store.updateCounter(props.id, { rotated: !currentCounter.value.rotated })
    optionsState.value = false
}

const toggleOptions = () => {
    optionsState.value = !optionsState.value
}

const changeColor = (color) => {
    store.updateCounter(props.id, { color })
    optionsState.value = false
}

</script>

<template>
    <div class="counter"
        :style="{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)', backgroundColor: currentColor }">
        <div class="counter__header" :style="{ backgroundColor: currentColor.replace('500', '600') }">
            <div v-if="!isEditing" class="counter__option" :class="{ 'counter__option--open': optionsState }"
                @click="toggleOptions">
                <EllipsisVertical />
            </div>
            <div v-if="optionsState" class="counter__options">
                <button class="--outline" @click="rotate">
                    <RotateCw color="black" />
                </button>
                <button class="--outline" @click="deleteCounter">
                    <Trash2 color="black" />
                </button>
                <div v-for="color in colorList">
                    <button class="--outline" @click="changeColor(color)">
                        <Circle :color="color.replace('500', '700')" :fill="color" />
                    </button>
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
            <button class="counter__button" @click="decrement">
                <Minus />
            </button>
            <p class="counter__value">{{ counter }}</p>
            <button class="counter__button" @click="increment">
                <Plus />
            </button>
        </div>
    </div>
</template>

<style scoped>
.counter {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    min-height: 120px;
    align-items: center;
    border-radius: 10px;
    background-color: var(--clr-grey-500);
    overflow: hidden;

    .counter__header {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        background-color: var(--clr-grey-600);
        padding: 10px;

        .counter__option {
            display: flex;
            transition: transform 0.15s ease;
        }

        .counter__option--open {
            transform: rotate(90deg);
        }

        .counter__options {
            display: flex;
            gap: 10px;
            width: 100%;
            overflow: auto;
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
            gap: 10px;
            width: 100%;
        }
    }

    .counter__buttons {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 10px;

        .counter__button {
            width: 3em;
            height: 3em;
        }

        .counter__value {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>