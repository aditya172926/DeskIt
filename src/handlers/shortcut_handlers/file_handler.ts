import { invoke } from "@tauri-apps/api/core";
import { message, open, save } from "@tauri-apps/plugin-dialog";
import { ShortcutParams } from "../../types";
import { set_file_content } from "../../context/document_store";

export const file_shortcut_actions: Record<string, (args?: ShortcutParams) => void> = {
    "s": (args) => saveFile(args?.args?.content),
    "o": () => openFile()
}

export async function saveFile(contents: string|undefined) {
    if (contents ==  undefined) {
        await message("File contents are undefined", {kind: "error"});
        return;
    }
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

export async function openFile() {
    const selected_file = await open({
        // directory: true,
        multiple: false,
        filters: [{name: "Text files", extensions: ["txt"]}]
    });
    console.log("logging selected file: ", selected_file);

    if (selected_file) {
        let file_content: string = await invoke('read_file', {path: selected_file});
        console.log("file content ", file_content);
        set_file_content(file_content, selected_file);
    } else {
        await message("Unable to read the selected file", {kind: "warning"});
        return;
    }
}

