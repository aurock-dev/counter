<script setup>
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import { Columns, Rows, Plus, Hash } from 'lucide-vue-next';

const settings = useSettingsStore()
const counters = useCountersStore()

const addCounter = () => {
    const newId = counters.counters.length
        ? Math.max(...counters.counters.map(c => c.id)) + 1
        : 1;

    counters.addCounter({
        id: newId,
        value: 0,
        name: `Counter ${newId}`,
        color: 'var(--clr-grey-500)',
        rotated: false,
    });
}

const toggleColumn = () => {
    settings.columnCount = 2
}
const toggleRow = () => {
    settings.columnCount = 1
}

</script>

<template>
    <div class="header">
        <button class="--btn-icon" @click="addCounter">
            <Plus />
        </button>
        <div class="header__title">
            <Hash />
            <span v-if="counters.counters.length > 0">({{ counters.counters.length }})</span>
        </div>
        <div>
            <button v-if="settings.columnCount == 1" class="--btn-icon" @click="toggleColumn">
                <Columns />
            </button>
            <button v-if="settings.columnCount == 2" class="--btn-icon" @click="toggleRow">
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
    background-color: var(--dark-grey);
    color: var(--light);

    .header__title {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .header__links {
        display: flex;
        gap: 20px;

        .header__link {
            color: var(--light-grey);
            text-decoration: none;
        }

        .header__link.router-link-active {
            color: var(--light);
            font-weight: bold;
        }
    }
}
</style>