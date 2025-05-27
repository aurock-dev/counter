<script setup>
import { RouterLink } from 'vue-router'
import { settingsStore } from '@/store/settings';
import { Columns, Rows, Plus, Hash } from 'lucide-vue-next';

const store = settingsStore()

const addCounter = () => {
    store.counters.push(store.counters.length + 1)
}

const toggleColumn = () => {
    store.columnCount = 2
}
const toggleRow = () => {
    store.columnCount = 1
}

</script>

<template>
    <div class="header">
        <button class="--btn-icon" @click="addCounter">
            <Plus />
        </button>
        <div class="header__title">
            <Hash />
            <span v-if="store.counters.length > 0">({{ store.counters.length }})</span>
            <!-- <RouterLink class="header__link" to="/">
                Counters
                <span v-if="store.counters.length > 0">({{ store.counters.length }})</span>
            </RouterLink> -->
            <!-- <RouterLink class="header__link" to="/settings">Settings</RouterLink> -->
        </div>
        <div>
            <button v-if="store.columnCount == 1" class="--btn-icon" @click="toggleColumn">
                <Columns />
            </button>
            <button v-if="store.columnCount == 2" class="--btn-icon" @click="toggleRow">
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