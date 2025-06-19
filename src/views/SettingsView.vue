<script setup>
import { useSettingsStore } from '@/store/settings'
import { StretchHorizontal, Square } from 'lucide-vue-next';


const settings = useSettingsStore()

const changeWinnerColor = (option) => {
    settings.optionWinnerColor = option;
}
</script>

<template>
    <div class="settings" :class="[settings.optionWinnerColor === 1 ? 'settings-accentBlack' : 'settings-accentWhite']">
        <div class="settings__section">
            <span class="settings__title">Display winner color :</span>
            <div class="settings__toggle-group">
                <div class="settings__toggle"
                    :class="{ 'settings__toggle--selected': settings.optionWinnerColor === 1 }"
                    @click="changeWinnerColor(1)">
                    <StretchHorizontal />
                    <span>Header/Footer</span>
                </div>
                <div class="settings__toggle"
                    :class="{ 'settings__toggle--selected': settings.optionWinnerColor === 2 }"
                    @click="changeWinnerColor(2)">
                    <Square />
                    <span>Everywhere</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings {
    height: calc(100vh - var(--footer-height));
    padding: 20px;
}

.settings-accentBlack{
    color: var(--clr-black);
}

.settings-accentBlack .settings__toggle--selected{
    border: 2px solid var(--clr-black);
}

.settings-accentWhite{
    color: var(--clr-white);
}

.settings-accentWhite .settings__toggle--selected{
    border: 2px solid var(--clr-white);
}

.settings__section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    padding: 10px;
    backdrop-filter: blur(40px) brightness(1.1);
    box-shadow: var(--counter-shadow);
}

.settings__title {
    font-size: 18px;
    font-weight: 600;
}

.settings__toggle-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 10px;
}

.settings__toggle {
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>
