import { defineStore } from 'pinia';
import { useThemeStore } from './ThemeStore';
import { useChristmasStore } from './festivities/ChristmasStore';

import postit from "@/img/postit.webp";
import maldive from "@/img/maldive.webp";
import forest from "@/img/winter-forest.webp";
import foglie from "@/img/foglie.webp";
import jeans from "@/img/jeans-mio.webp";

import crumpPaper from "@/img/carta-stropicciata.webp";
import wave from "@/img/onda.webp";
import cincia from "@/img/cincia.webp";
import leottaJeans from "@/img/jeans-zip.webp";

import matrix from "@/img/matrix-code.webp";
import periodicBgJeans from "@/img/jeans-periodic-background.webp";
import lemonTree from "@/img/lemon-tree.webp";
import ioIle from "@/img/io-e-ile.webp";
import tupac from "@/img/tupac.webp";
import mrPink from "@/img/mr-pink.webp";
import manfre from "@/img/manfredonia.webp";
import snow from "@/img/paesaggio-innevato.webp";
import christmasTree from "@/img/festivities/christmas-tree2.webp";

export const usePreloadStore = defineStore('preload', {
    state: () => ({
        theme: useThemeStore(),
        christmas: useChristmasStore(),
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
        setImagesSrc(themeMap) {
            const activeTheme =
                Object.keys(themeMap).find(key =>
                    this.theme?.[key] || this.christmas?.[key]
                );
            return activeTheme ? themeMap[activeTheme] : null;
        },
        loadBackgroundImg(component) {
            const deleteAll = {
                lightTheme: crumpPaper,
                summerTheme: wave,
                winterTheme: cincia,
                jeansTheme: leottaJeans,
            };
            const periodicList = {
                lightTheme: ioIle,
                retroTheme: matrix,
                summerTheme: manfre,
                winterTheme: snow,
                jeansTheme: periodicBgJeans,
                lemonTheme: lemonTree,
                panterTheme: tupac,
                pinkTheme: mrPink,
                christmasTheme: christmasTree,
            };
            const confirm = {
                lightTheme: postit,
                summerTheme: maldive,
                winterTheme: forest,
                lemonTheme: foglie,
                jeansTheme: jeans,
            };
            const srcMap = {
                'confirm-modal': () => this.setImagesSrc(confirm),
                'delete-all-panel': () => this.setImagesSrc(deleteAll),
                'periodic-list': () => this.setImagesSrc(periodicList),
            };

            if (!srcMap[component]) {
                alert(`Nome errato in PreloadStore > loadBackgroundImg. Hai scritto: "${component}"`);
                return;
            }

            this.src = srcMap[component]?.call(this) ?? null;

            if (!this.src) return;

            return new Promise(resolve => {
                const img = new Image();
                img.onload = resolve;
                img.src = this.src;
            });
        },
        loadFontOnce(href) {
            if (document.querySelector(`link[href="${href}"]`)) return;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';      // non blocca il render
            link.onload = () => { link.media = 'all'; }; // applica dopo il download
            document.head.appendChild(link);
        }
    }
});