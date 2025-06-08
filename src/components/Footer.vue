<script setup>
import { useSettingsStore } from '@/store/settings';
import { useCountersStore } from '@/store/counters';
import { Hash, Settings } from 'lucide-vue-next';

const settings = useSettingsStore()
const counters = useCountersStore()

</script>

<template>
    <div class="footer" :style="settings.optionWinnerColor === 1 ? { background: counters.winnerGradient } : {}">
        <RouterLink class="footer__link" to="/">
            <Hash color="var(--clr-white)" />
        </RouterLink>
        <RouterLink class="footer__link" to="/settings">
            <Settings color="var(--clr-white)" />
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
        color: var(--clr-white);
        padding: 5px;
    }

    .footer__link.router-link-active {
        color: var(--clr-white);
        border: 2px solid var(--clr-white);
        border-radius: 7px;
    }
}
</style>