<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { onMounted, onUnmounted, ref } from "vue";
import { save } from "@tauri-apps/plugin-dialog";
import { all_shortcuts } from "./shortcut_handlers";

const text = ref(""); // This holds the notepad content

async function saveFile(contents: String) {
  // Let the user choose where to save
  const filePath = await save({
    defaultPath: 'document.txt', // default suggestion
    filters: [
      { name: 'Text Files', extensions: ['txt'] }
    ]
  });

  if (filePath) {
    await invoke('save_file', { contents, path: filePath });
  }
}

async function handleKeyDown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey)) {
    let pressed_key = e.key.toLowerCase();
    if (pressed_key === "s") {
      e.preventDefault();
      console.log("Save action triggered");
      await saveFile(text.value).then(() => {
        console.log("File saved successfully");
      }).catch((error) => {
        console.error("Error saving file:", error);
      })
    }

    const action = all_shortcuts[pressed_key];
    if (action) {
      e.preventDefault();
      action();
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
