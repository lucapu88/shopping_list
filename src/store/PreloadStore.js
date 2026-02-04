import { defineStore } from 'pinia';
import { useThemeStore } from './ThemeStore';

import postit from "@/img/postit.webp";
import maldive from "@/img/maldive.webp";
import forest from "@/img/winter-forest.webp";
import foglie from "@/img/foglie.webp";
import jeans from "@/img/jeans-mio.webp";

import crumpPaper from "@/img/carta-stropicciata.webp";
import wave from "@/img/onda.webp";
import cincia from "@/img/cincia.webp";
import leottaJeans from "@/img/jeans-zip.webp";

export const usePreloadStore = defineStore('preload', {
    state: () => ({
        theme: useThemeStore(),
        src: null,
    }),
    getters: {},
    actions: {
        preloadImage(href) {
            if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;

            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = href;

            document.head.appendChild(link);
        },
        setConfirmSrc() {
            if (this.theme.lightTheme) {
                return postit;
            } else if (this.theme.summerTheme) {
                return maldive;
            } else if (this.theme.winterTheme) {
                return forest;
            } else if (this.theme.lemonTheme) {
                return foglie;
            } else if (this.theme.jeansTheme) {
                return jeans;
            }
        },
        setDeleteAllSrc() {
            if (this.theme.lightTheme) {
                return crumpPaper;
            } else if (this.theme.summerTheme) {
                return wave;
            } else if (this.theme.winterTheme) {
                return cincia;
            } else if (this.theme.jeansTheme) {
                return leottaJeans;
            }
        },
        loadConfirmBackgoundImg(component) {
            this.src = component === 'confirm-modal' ? this.setConfirmSrc() : component === 'delete-all-panel' ? this.setDeleteAllSrc() : null;

            if (!this.src) return;

            return new Promise(resolve => {
                const img = new Image();
                img.onload = resolve;
                img.src = this.src;
            });
        }
    }
});