use std::process::exit;

use crate::api::{make_get_request, make_post_request};
use crate::models::{
    APIResult, Commit, Gist, GistInput, GithubUser, NewGistResponse, Repository, URL,
};

#[tauri::command]
pub fn get_public_gists() -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("gists")), None)?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories() -> APIResult<Vec<Repository>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("repositories")), None)?;
    let response: Vec<Repository> = match serde_json::from_str(&response) {
        Ok(result) => {
            result
        },
        Err(error) => {
            println!("Error in API {:?}", &error);
            exit(1);
        }
    };
    Ok(response)
}

#[tauri::command]
pub fn get_repositories_for_authenticated_user(token: &str) -> APIResult<Vec<Repository>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("users/repos?type=private")), Some(token))?;
    println!("Authenticated user repository response {:?}", response);
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_for_authenticated_user(token: &str) -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("gists")), Some(token))?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_content(url: String, token: Option<&str>) -> APIResult<String> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token)?;
    Ok(response)
}

#[tauri::command]
pub fn get_users_associated_with_repository(
    url: String,
    token: Option<&str>,
) -> APIResult<Vec<GithubUser>> {
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
    let response = make_post_request(URL::WithBaseUrl(String::from("gists")), Some(token), gist)?;
    let response: NewGistResponse = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories_for_user(username: String) -> APIResult<Vec<Repository>> {
    let response = make_get_request(URL::WithBaseUrl(format!("users/{}/repos", username)), None)?;
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_user_profile(username: String) -> APIResult<GithubUser> {
    let response = make_get_request(URL::WithBaseUrl(format!("users/{}", username)), None)?;
    let response: GithubUser = serde_json::from_str(&response).unwrap();
    Ok(response)
}