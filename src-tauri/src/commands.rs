use std::fs::File;
use std::io::Write;

#[tauri::command]
pub fn save_file(contents: String, path: String) -> Result<(), String> {
    let mut file = match File::create(path.as_str()) {
        Ok(file) => file,
        Err(e) => return Err(format!("Failed to create file: {}", e)),
    };

    file.write_all(contents.as_bytes())
        .map_err(|e| format!("Failed to write to file: {}", e))?;
    Ok(())
}

#[tauri::command]
pub fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path).map_err(|e| format!("Backend failed to read file at {}: {}", path, e))
}