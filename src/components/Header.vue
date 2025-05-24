<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <div class="header">
        <div class="header__links">
            <RouterLink class="header__link" to="/">Counters</RouterLink>
            <RouterLink class="header__link" to="/settings">Settings</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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