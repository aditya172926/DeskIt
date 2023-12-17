use crate::api::{make_get_request, make_post_request};
use crate::models::{APIResult, Commit, Gist, GistInput, GithubUser, NewGistResponse, Repository, URL};

#[tauri::command]
pub fn get_public_gists() -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl("gists"), None)?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories() -> APIResult<Vec<Repository>> {
    let response = make_get_request(URL::WithBaseUrl("repositories"), None)?;
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_repositories_for_authenticated_user(token: &str) -> APIResult<Vec<Repository>> {
    let response = make_get_request(URL::WithBaseUrl("users/repos?type=private"), Some(token))?;
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_for_authenticated_user(token: &str) -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl("gists"), Some(token))?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_content(url: String, token: Option<&str>) -> APIResult<String> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token)?;
    Ok(response)
}

#[tauri::command]
pub fn get_users_associated_with_repository(url: String, token: Option<&str>) -> APIResult<Vec<GithubUser>> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token)?;
    let response: Vec<GithubUser> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_commits_to_repository(url: String, token: Option<&str>) -> APIResult<Vec<Commit>> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token)?;
    let response: Vec<Commit> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn create_new_gist(gist: GistInput, token: &str) -> APIResult<NewGistResponse> {
    let response = make_post_request(URL::WithBaseUrl("gists"), Some(token), gist)?;
    let response: NewGistResponse = serde_json::from_str(&response).unwrap();
    Ok(response)
}