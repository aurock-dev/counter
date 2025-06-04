<script setup>
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import { Columns, Rows, Plus, Hash } from 'lucide-vue-next';

const settings = useSettingsStore()
const counters = useCountersStore()

</script>

<template>
    <div class="header" :style="settings.optionWinnerColor === 1 ? { background: counters.winnerGradient } : {}">
        <button class="--btn-icon" @click="counters.createCounter()">
            <Plus />
        </button>
        <div class="header__title">
            <Hash />
            <span v-if="counters.counters.length > 0">({{ counters.counters.length }})</span>
        </div>
        <div>
            <button v-if="settings.columnCount == 1" class="--btn-icon" @click="settings.setColumns()">
                <Columns />
            </button>
            <button v-if="settings.columnCount == 2" class="--btn-icon" @click="settings.setRows()">
                <Rows />
            </button>
        </div>
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
    padding: 2px 5px;
    color: var(--clr-white);

    .header__title {
        display: flex;
        align-items: center;
        height: 100%;
    }
}
</style>