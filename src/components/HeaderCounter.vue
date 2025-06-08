<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import { Columns, Rows, Plus, Hash, EllipsisVertical, TrendingUp, TrendingDown } from 'lucide-vue-next';

const settings = useSettingsStore()
const counters = useCountersStore()

const optionsState = ref(false)

const toggleOptions = () => {
    optionsState.value = !optionsState.value
}
</script>

<template>
    <div class="header" :style="settings.optionWinnerColor === 1 ? { background: counters.winnerGradient } : {}">
        <div class="header__option" :class="{ 'header__option--open': optionsState }" @click="toggleOptions">
            <EllipsisVertical color="var(--clr-white)" />
        </div>
        <div v-if="optionsState" class="header__options">
            <div>
                <button v-if="settings.columnCount == 1" class="--btn-icon" @click="settings.setColumns()">
                    <Columns />
                </button>
                <button v-if="settings.columnCount == 2" class="--btn-icon" @click="settings.setRows()">
                    <Rows />
                </button>
            </div>
            <div>
                <button v-if="counters.mostPointFirst" class="--btn-icon" @click="counters.leastPointWin()">
                    <TrendingUp />
                </button>
                <button v-if="!counters.mostPointFirst" class="--btn-icon" @click="counters.mostPointWin()">
                    <TrendingDown />
                </button>
            </div>
        </div>
        <div v-if="!optionsState" class="header__title">
            <Hash />
            <span v-if="counters.counters.length > 0">({{ counters.counters.length }})</span>
        </div>
        <button v-if="!optionsState" class="--btn-icon" @click="counters.createCounter()">
            <Plus />
        </button>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 2px 5px;
    color: var(--clr-white);

    .header__title {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .header__option {
        display: flex;
        transition: transform 0.15s ease;
    }

    .header__option--open {
        transform: rotate(90deg);
    }

    .header__options {
        display: flex;
        gap: 10px;
        width: 100%;
    }
}
</style>