<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useThemeStore } from '@/store/ThemeStore';
import ToggleTutorialButton from '../tutorials/ToggleTutorialButton.vue';
import Tutorial from '../tutorials/Tutorial.vue';
</script>
<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      todosStore: useAddModifyDeleteTodosStore(),
      theme: useThemeStore(),
      showDelete: false,
      showDeleteText: null,
      showOnlyLatestDeleted: 'showOnlyLatestDeleted',
      showOnlyLatestDeletedInfo: 'showOnlyLatestDeletedInfo',
    };
  },
  created() {
    this.todosStore.getOnlyDeletedTodos();
    this.showDeleteText =
      this.languages.showOnlyLatestDeletedText.buttonShowText;
  },
  methods: {
    showDeleted() {
      this.showDelete = !this.showDelete;
      this.showDeleteText = this.showDelete
        ? this.languages.showOnlyLatestDeletedText.buttonHideText
        : this.languages.showOnlyLatestDeletedText.buttonShowText;
    },
  },
};
</script>

<template>
  <div class="helper-settings">
    <span
      class="settings-icon mr-1"
      @click="settings.highlightsForTutorial(10)"
    >
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 10 }">
      {{ languages.showOnlyLatestDeletedText.title }}:
    </span>
    <span
      class="info-icon"
      @click="settings.toggleInfo(showOnlyLatestDeletedInfo)"
      >i</span
    ><br />
    <li
      class="ml-4"
      v-if="settings.info && settings.featureInfo === showOnlyLatestDeletedInfo"
    >
      ({{ languages.showOnlyLatestDeletedText.description }})
      <ToggleTutorialButton :features="showOnlyLatestDeleted" />
    </li>
    <div class="show-hide-deleted-list-container">
      <p id="show-hide-deleted" class="show-hide-btn" @click="showDeleted()">
        <span class="toggle-delete-confirm"> &#x1F449; </span>
        {{ showDeleteText }}
      </p>
      <div class="show-hide-deleted-container" v-if="showDelete">
        <!-- TODO SINGOLO -->
        <span
          class="show-last-deleted-title"
          :class="{ 'animate-charcter': !theme.retroTheme }"
        >
          {{ languages.showOnlyLatestDeletedText.singleTodoText }}:
        </span>
        <ul
          v-if="
            todosStore.deletedSingleTodo && todosStore.deletedSingleTodo.length
          "
          class="todo-deleted-container"
          :class="{ 'retro-border': theme.retroTheme }"
        >
          <li
            class="todo-deleted"
            v-for="(todo, index) in todosStore.deletedSingleTodo"
            :key="index"
          >
            <!-- sull'ultimo elemento non voglio nulla perchè è la data -->
            <span v-if="index < todosStore.deletedSingleTodo.length - 1"
              >></span
            >
            {{ todo }}
          </li>
        </ul>
        <!-- TODO MULTIPLI -->
        <span
          class="show-last-deleted-title"
          :class="{ 'animate-charcter': !theme.retroTheme }"
        >
          {{ languages.showOnlyLatestDeletedText.multipleTodosText }}:
        </span>
        <ul
          class="multiple-deleted-container"
          :class="{ 'retro-border': theme.retroTheme }"
          v-if="todosStore.deletedTodos && todosStore.deletedTodos.length"
        >
          <li
            class="todo-deleted"
            v-for="(todo, index) in todosStore.deletedTodos"
            :key="index"
          >
            <!-- sull'ultimo elemento non voglio nulla perchè è la data -->
            <span v-if="index < todosStore.deletedTodos.length - 1">></span>
            {{ todo }}
          </li>
        </ul>
      </div>
    </div>

    <Tutorial
      v-if="settings.video && settings.feature === showOnlyLatestDeleted"
      :features="showOnlyLatestDeleted"
    />
  </div>
</template>

<style scoped>
.show-hide-btn {
  border: none;
  background-color: transparent;
  margin-left: 20px;
  margin-bottom: 10px;
}
.animate-charcter {
  background-image: linear-gradient(
    -225deg,
    #ff1361 67%,
    #44107a 29%,
    #231557 0%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2.5s linear;
  /* animation-delay: 0.8s; */
  /* animation-iteration-count: 2; */
  display: inline-block;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
.show-hide-deleted-container {
  display: flex;
  flex-direction: column;
  animation: bounce 0.8s ease;
}
@keyframes bounce {
  70% {
    transform: translateY(2%);
  }
  80% {
    transform: translateY(-15%);
  }
  90% {
    transform: translateY(0%);
  }
  95% {
    transform: translateY(-7%);
  }
  97% {
    transform: translateY(0%);
  }
  99% {
    transform: translateY(-3%);
  }
  100% {
    transform: translateY(0);
  }
}
.show-last-deleted-title {
  color: #d00000;
}
.multiple-deleted-container {
  margin-bottom: 10px;
}
.todo-deleted {
  margin: 0;
  display: block;
}

.todo-deleted-container,
.multiple-deleted-container {
  border: 2px solid;
  padding: 5px;
  border-radius: 10px;
}
</style>
