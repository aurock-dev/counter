<script setup>
import { Hash, Settings } from 'lucide-vue-next';

</script>

<template>
    <div class="footer">
        <RouterLink class="footer__link" to="/">
            <Hash />
        </RouterLink>
        <RouterLink class="footer__link" to="/settings">
            <Settings />
        </RouterLink>
    </div>
</template>

<style scoped>
.footer {
    width: 100%;
    height: var(--footer-height);
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .footer__link {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--clr-black);
        padding: 5px;
    }

    .footer__link.router-link-active {
        color: var(--clr-black);
        border: 2px solid var(--clr-black);
        border-radius: 7px;
    }
}
</style>