import { zoom_shortcut_actions } from "./zoom";
import { file_shortcut_actions } from "./file_handler";
import { ShortcutParams } from "../../types";

export const all_shortcuts: Record<string, (args?: ShortcutParams) => void> = {
    ...zoom_shortcut_actions,
    ...file_shortcut_actions
}