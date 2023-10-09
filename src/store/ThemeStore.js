import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        lightTheme: false,
        darkTheme: false,
        minimalTheme: false,
        retroTheme: false,
        summerTheme: false,
        winterTheme: false,
    }),
    getters: {},
    actions: {
        setThemeOnLoad() {
            const lightThemeSelected = window.localStorage.getItem('lightTheme');
            this.lightTheme = lightThemeSelected === 'true';
            if (this.lightTheme) { this.changeThemeStyle('Light', "url('@/img/foglio_righe.webp')"); }

            const darkThemeSelected = window.localStorage.getItem('darkTheme');
            this.darkTheme = darkThemeSelected === 'true';
            if (this.darkTheme) {
                this.changeThemeStyle('Dark', 'none', '#333333', '#FFFFFF');
                document.body.style.height = '100vh';
                document.body.style.border = '10px solid #d17e47';
            }

            const minimalThemeSelected = window.localStorage.getItem('minimalTheme');
            this.minimalTheme = minimalThemeSelected === 'true';
            if (this.minimalTheme) {
                this.changeThemeStyle('Minimal', 'none', '#A5BECC', '#7C3E66', '"Cabin", sans-serif');
            }

            const retroThemeSelected = window.localStorage.getItem('retroTheme');
            this.retroTheme = retroThemeSelected === 'true';
            if (this.retroTheme) {
                this.changeThemeStyle('Dos', 'none', '#090A0C', '#FFFFFF', '"DotGothic16", sans-serif');
            }

            const summerThemeSelected = window.localStorage.getItem('summerTheme');
            this.summerTheme = summerThemeSelected === 'true';
            if (this.summerTheme) {
                this.changeThemeStyle('Summer', "url('@/img/mare.webp')", '#EFCB8F');
                document.body.style.backgroundRepeat = 'no-repeat';
                document.getElementById('helper-description').style.backgroundImage = 'none';
                document.getElementById('helper-description-container').style.background = 'rgb(188,242,221)';
                document.getElementById('helper-description-container').style.background = 'linear-gradient(168deg, rgba(188,242,221,1) 0%, rgba(129,215,235,1) 47%, rgba(46,152,242,1) 100%)';
                document.getElementById('helper-description').style.filter = 'drop-shadow(2px 4px 6px black)';
                document.querySelector('.confirm').style.backgroundImage = 'none';
            }

            const winterThemeSelected = window.localStorage.getItem('winterTheme');
            this.winterTheme = winterThemeSelected === 'true';
            if (this.winterTheme) {
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';
                this.changeThemeStyle('Winter', "url('@/img/montagne.webp')", '#232F34', '#FFFFFF');

                document.getElementById('helper-description-container').style.backgroundImage = "url('@/img/inverno.webp')";
                document.getElementById('helper-description-container').style.backgroundSize = 'cover';
                document.getElementById('todo').style.filter = 'drop-shadow(2px 4px 6px black)';
                document.getElementById('helper-description').style.filter = 'drop-shadow(2px 4px 6px black)';
                document.querySelector('.confirm').style.backgroundImage = 'none';
                document.querySelector('.confirm').style.filter = 'drop-shadow(2px 4px 6px black)';
            }
        },
        changeThemeStyle(themeName, backgroundImage, backgroundColor, color, fontFamily) {
            this.themeName = themeName;
            document.body.style.backgroundImage = backgroundImage;
            document.body.style.backgroundColor = backgroundColor;
            if (color) { document.body.style.color = color; }
            if (fontFamily) { document.body.style.fontFamily = fontFamily; }
        },
    },
});


