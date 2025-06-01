<script setup>
import { Hash, Settings } from 'lucide-vue-next';


</script>

<template>
    <div class="footer">
        <RouterLink class="footer__links" to="/">
            <Hash />
        </RouterLink>
        <RouterLink class="footer__links" to="/settings">
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

    .footer__link svg {
        color: var(--clr-white);
    }

    .footer__link.router-link-active {
        color: var(--clr-white);
    }
}
</style>