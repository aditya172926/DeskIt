import { ref } from "vue";

export const current_file_path = ref<string | null>(null);
export const file_content = ref("");

export function set_file_content(content: string, path?: string) {
    file_content.value = content;
    if (path) 
        current_file_path.value = path;
}