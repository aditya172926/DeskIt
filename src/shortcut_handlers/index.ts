import { zoom_shortcut_actions } from "./zoom";

export const all_shortcuts: Record<string, () => void> = {
    ...zoom_shortcut_actions
}