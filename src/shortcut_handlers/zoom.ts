let zoom_level = 1;

export const zoom_shortcut_actions: Record<string, () => void> = {
    "+": () => {zoom_level += 0.1; apply_zoom();},
    "-": () => {zoom_level = Math.max(0.5, zoom_level - 0.1); apply_zoom();},
}

function apply_zoom() {
    const textarea = document.querySelector("textarea");
    if (textarea) {
        textarea.style.fontSize = `${zoom_level}em`;
    }
    console.log(`current zoom level ${zoom_level}`);
}