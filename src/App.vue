<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { all_shortcuts } from "./handlers/shortcut_handlers";
import { saveFile } from "./handlers/shortcut_handlers/file_handler";
import { ShortcutParams } from "./types";

const text = ref(""); // This holds the notepad content


async function handleKeyDown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey)) {
    let pressed_key = e.key.toLowerCase();
    let args: ShortcutParams = {
      args: undefined
    };

    // if saving a file
    if (pressed_key === "s") {
      args.args = {
        content: text.value
      }
    }

    const action = all_shortcuts[pressed_key];
    if (action) {
      e.preventDefault();
      action(args);
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

</script>

<template>
  <main class="editor-container">
    <textarea
      v-model="text"
      class="notepad"
      placeholder="Start to write"
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
