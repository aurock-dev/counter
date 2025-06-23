<script setup>
import pkg from '../../package.json'
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { StretchHorizontal, Square } from 'lucide-vue-next';
import Changelog from '@/components/Changelog.vue'

const showChangelog = ref(false)
const version = pkg.version

const settings = useSettingsStore()

const changeWinnerColor = (option) => {
    settings.optionWinnerColor = option;
}
</script>

<template>
    <div class="settings" :class="[settings.optionWinnerColor === 1 ? 'settings-accentBlack' : 'settings-accentWhite']">
        <div class="settings__container">
            <div class="settings__block">
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
        <div class="settings__about">
            <div>Colorful Counters (C#)</div>
            <div @click="showChangelog = true"> > V{{ version }} < </div>
            <div>Made with ton of 🐛 by <a href="https://aurock.dev" target="_blank">Aurock</a></div>
        </div>
         <Changelog :visible="showChangelog" @close="showChangelog = false" />
    </div>
</template>

<style scoped>
.settings {
    height: calc(100vh - var(--footer-height));
    display: flex;
    flex-direction: column;
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

.settings__container{
    height: 100%
}

.settings__block {
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

.settings__about{
    font-size: 0.75em;
    text-align: center;
}
</style>
