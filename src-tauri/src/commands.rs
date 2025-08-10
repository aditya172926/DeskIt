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
