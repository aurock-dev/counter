<script setup>
import { useSettingsStore } from '@/store/settings'

const settings = useSettingsStore()

const changeWinnerColor = (option) => {
    settings.optionWinnerColor = option;
}

</script>

<template>
    <div class="settings">
        <div class="settings__winnercolor">
            <p>Display winner(s) color(s) :</p>
            <div class="settings__winnercolor_options">
                <button :class="{ '--btn-selected': settings.optionWinnerColor === 1 }"
                    @click="changeWinnerColor(1)">Header/Footer</button>
                <button :class="{ '--btn-selected': settings.optionWinnerColor === 2 }"
                    @click="changeWinnerColor(2)">Everywhere</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings {
    height: calc(100vh - var(--footer-height));
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
}

.settings__winnercolor {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.settings__winnercolor_options {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.--btn-selected {
    background-color: var(--clr-blue-700);
}
</style>