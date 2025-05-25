<script setup>
import { RouterLink } from 'vue-router'
import { settingsStore } from '@/store/settings';
import { Columns, Rows } from 'lucide-vue-next';

const store = settingsStore()

const toggleColumn = () => {
    store.columnCount = 2
}
const toggleRow = () => {
    store.columnCount = 1
}

</script>

<template>
    <div class="header">
        <div class="header__links">
            <RouterLink class="header__link" to="/">
                Counters
                <span v-if="store.counters > 0">({{ store.counters }})</span>
            </RouterLink>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 5px;
    background-color: var(--dark-grey);
    color: var(--light);

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