<script setup></script>

<script>
export default {
  data() {
    return {
      textAreaHeight: 55,
    };
  },
  methods: {
    resetTextarea() {
      if (!document.getElementById('text-area').value) {
        this.textAreaHeight = 55;
        this.adjustTextareaHeight();
      }
    },
    adjustTextareaHeight() {
      document.getElementById(
        'text-area'
      ).style.height = `${this.textAreaHeight}px`;
    },
  },
};
</script>

<template>
  <div>
    <h1 style="color: red">PROVA</h1>
  </div>
</template>

<style scoped>
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

.helper-list {
  padding-inline-start: 25px;
}
.helper-list > li {
  display: list-item;
  animation: fadeIn 0.6s;
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

.helper-btn-dark {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  padding: 0 5px;
  z-index: 5;
  margin-right: calc(2% + 10px);
}
</style>
