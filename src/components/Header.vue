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
    background-color: #022252;
    color: #fff;

    .header__links {
        display: flex;
        gap: 20px;

        .header__link {
            color: #d8d8d8;
            text-decoration: none;
        }

        .header__link.router-link-active {
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>