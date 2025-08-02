<script setup lang="ts">
import { ref } from "vue";

const text = ref(""); // This holds the notepad content
</script>

<template>
  <main class="editor-container">
    <textarea
      v-model="text"
      class="notepad"
      placeholder="Start writing..."
    ></textarea>
  </main>
</template>

<style scoped>
.editor-container {
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #1e1e1e; /* VSCode dark theme */
  display: flex;
  flex-direction: column;
}

.notepad {
  width: 100%;
  height: 100%;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #1e1e1e;
  color: #d4d4d4;
  border: none;
  resize: none;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
}
</style>

<style>
:root {
  font-family: monospace;
  background-color: #1e1e1e;
  color: #d4d4d4;
  margin: 0;
  padding: 0;
}
</style>
