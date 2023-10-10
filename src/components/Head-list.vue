<script setup>
import { useChristmasStore } from '@/store/ChristmasStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      addTodo: useAddModifyDeleteTodosStore(),
      placeholder: 'Write here what to buy',
      defaultPlaceholderText: 'Write here what to buy',
    };
  },
  created() {
    this.addTodo.changeTodoAdded(this.addTodo.todos);
  },
  methods: {
    showHelper() {
      this.settings.openHelper();
      if (this.settings.helper) {
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
      this.settings.checkingUpdates();
      this.isChristmas.merryChristmasTheme();
    },
    addNewTodo() {
      this.addTodo.addTodo();
    },
    scrollToBottom() {
      const list = document.getElementById('todo-list');
      const container = document.getElementById('container-list');
      const listIsLong = list.offsetHeight > container.offsetHeight - 130;
      /*se la lista è lunga al punto che diventa scrollabile e se non è stata selezionata nessuna categoria,
              si suppone che l'elemento aggiunto sia in fondo alla lista e quindi scrollo direttamente verso il fondo per farlo notare*/
      const todoSelected = this.todos.find((t) => t.isSelected === true);
      if (listIsLong && !todoSelected) {
        document
          .getElementById('container-list')
          .scrollTo(0, document.body.scrollHeight);
      }
    },
  },
};
</script>

<template>
  <img
    v-if="isChristmas.christmasTheme"
    class="christmas-theme"
    src="@/img/ghirlanda.webp"
    alt="merry-christmas"
  />
  <div
    class="header-container"
    :class="{ christmas: isChristmas.christmasTheme }"
  >
    <h2
      v-if="languages.langIta"
      class="title text-center"
      :class="{
        'dark-theme-title': theme.darkTheme,
        'minimal-theme-title': theme.minimalTheme,
        'retro-theme-title': theme.retroTheme,
      }"
    >
      Lista Spesa
    </h2>
    <h2
      v-else
      class="title text-center"
      :class="{
        'dark-theme-title': theme.darkTheme,
        'minimal-theme-title': theme.minimalTheme,
        'retro-theme-title': theme.retroTheme,
      }"
    >
      Shopping List
    </h2>
    <h2
      v-if="languages.langIta"
      class="title2 text-center"
      :class="{
        'minimal-theme-title2': theme.minimalTheme,
        'retro-theme-title2': theme.retroTheme,
      }"
    >
      Lista Spesa
    </h2>
    <h2
      v-else
      class="title2 title2-eng text-center"
      :class="{
        'minimal-theme-title2': theme.minimalTheme,
        'retro-theme-title2': theme.retroTheme,
      }"
    >
      Shopping List
    </h2>

    <span
      class="helper"
      :class="{
        'helper-selected': settings.helper,
        'helper-deselected': !settings.helper,
        'helper-btn-dark': theme.darkTheme,
      }"
      @click="showHelper()"
    >
      <img class="settings" src="@/img/settings.webp" alt="settings" />
    </span>
    <div class="input-btns-container">
      <input
        class="inputText mb-2 border border-primary rounded"
        :class="{
          'placeholder-selected': this.placeholder != defaultPlaceholderText,
        }"
        ref="myInput"
        v-model="addTodo.newTodo"
        @keypress.enter="addNewTodo()"
        :placeholder="this.placeholder"
      />
      <button class="btn btn-info" @click="addNewTodo()">
        <i class="far fa-paper-plane"></i>
      </button>
    </div>
    <!-- !-- -----------------------------------PULSANTIERA------------------------------------ --
            <div class="pushbutton-container">
              !-- DRAG N DROP --
              <button class="btn custom-show-listbtn" :class="{
                'btn-selected': isDraggable, 
                'minimal-btn': minimalTheme, 
                'minimal-selected-btn': minimalTheme && isDraggable,
                'retro-teme-btns': retroTheme,
              }" @click="toggleDragDrop()">
                <img src="./img/drag-and-drop.webp" alt="move" />
              </button>
              !--PULSANTE COPIA LISTA--
              <button class="btn btn-outline-success"
                :class="{'minimal-btn': minimalTheme, 'retro-teme-btns': retroTheme,}" @click="copy()"><i
                  class="far fa-copy"></i><br /></button>
              !--PULSANTE MOSTRA CATEGORIE --
              <button class="btn custom-show-listbtn" :class="{
                'btn-selected': categoryList, 
                'minimal-btn': minimalTheme, 
                'minimal-selected-btn': minimalTheme && categoryList,
                'retro-teme-btns': retroTheme,
              }" @click="showCategoryList()">
                <span v-if="!categoryList">+</span>
                <span v-else>-</span>
              </button>
            </div>
            <div class="drag-n-drop-text">
              <small v-if="langIta && isDraggable">
                Trascina gli elementi della lista dove vuoi
              </small>
              <small v-if="!langIta && isDraggable">
                Drag the elements of the list where you want
              </small>
            </div> -->
  </div>
</template>

<style scoped>
.header-container {
  width: 365px;
  position: relative;
}
.christmas {
  margin-top: 30px;
}

.title {
  background: -webkit-radial-gradient(circle, #ff0000 0%, #3d0000 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  left: -300px;
  -webkit-animation: slide 2s forwards;
  animation: slide 2s forwards;
  z-index: 1;
}
@-webkit-keyframes slide {
  100% {
    left: 0;
  }
}
@keyframes slide {
  100% {
    left: 0;
  }
}
.title2,
.title2-eng {
  background: -webkit-radial-gradient(circle, #333232 0%, #909090 95%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 0;
  right: 29%;
  animation-name: fadeOutOpacity;
  animation-iteration-count: 1;
  animation-delay: 2.5s;
  animation-timing-function: ease-out;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
}

.title2-eng {
  right: 23%;
}
@keyframes fadeOutOpacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.btn-info {
  padding: 10px;
}
.dark-theme-title {
  background: -webkit-radial-gradient(circle, #ffffff 0%, #ffffff 95%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.helper-selected {
  -webkit-animation: spin 2s linear;
  -moz-animation: spin 2s linear;
  animation: spin 2s linear;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.helper-deselected {
  -webkit-animation: reverseSpin 1.5s linear;
  -moz-animation: reverseSpin 1.5s linear;
  animation: reverseSpin 1.5s linear;
}
@-moz-keyframes reverseSpin {
  100% {
    -moz-transform: rotate(-360deg);
  }
}
@-webkit-keyframes reverseSpin {
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes reverseSpin {
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

.input-btns-container {
  display: flex;
  align-items: baseline;
  gap: 10px;
  justify-content: center;
}
.inputText {
  padding: 10px;
  width: 70%;
  text-align: center;
}
.helper {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  /* padding: 0 5px; */
  z-index: 5;
  margin-right: 2%;
}

.helper:hover {
  cursor: pointer;
}
.settings {
  width: 33px;
}
</style>
