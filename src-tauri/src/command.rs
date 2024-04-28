use crate::api::{make_get_request, make_post_request};
use crate::models::{
    APIResult, ApiRequest, AuthState, AuthTokens, Commit, Gist, GistInput, GithubUser, NewGistResponse, Repository, URL
};
use serde_json::Value;
use std::collections::HashMap;
use std::thread;
use tauri::State;

#[tauri::command]
pub fn get_public_gists() -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("gists")), None, None)?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories(token: Option<&str>) -> APIResult<Vec<Repository>> {
    let response =
        match make_get_request(URL::WithBaseUrl(String::from("repositories")), token, None) {
            Ok(repositories) => repositories,
            Err(error) => {
                println!("Error in get_public_repositories API {:?}", error);
                String::new()
            }
        };
    let response: Vec<Repository> = match serde_json::from_str(&response) {
        Ok(result) => result,
        Err(error) => {
            println!("Error in serializing Public repositories {:?}", error);
            vec![]
        }
    };
    Ok(response)
}

#[tauri::command]
pub fn get_repositories_for_authenticated_user(token: &str) -> APIResult<Vec<Repository>> {
    let response = make_get_request(
        URL::WithBaseUrl(String::from("users/repos?type=private")),
        Some(token),
        None,
    )?;
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_for_authenticated_user(token: &str) -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("gists")), Some(token), None)?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_gist_content(url: String, token: Option<&str>) -> APIResult<String> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token, None)?;
    Ok(response)
}

#[tauri::command]
pub fn get_users_associated_with_repository(
    url: String,
    token: Option<&str>,
) -> APIResult<Vec<GithubUser>> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token, None)?;
    let response: Vec<GithubUser> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_commits_to_repository(url: String, token: Option<&str>) -> APIResult<Vec<Commit>> {
    let response = make_get_request(URL::WithoutBaseUrl(url), token, None)?;
    let response: Vec<Commit> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn create_new_gist(gist: GistInput, token: &str) -> APIResult<NewGistResponse> {
    let response = make_post_request(
        URL::WithBaseUrl(String::from("gists")),
        Some(token),
        Some(gist),
        None,
    )?;
    let response: NewGistResponse = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories_for_user(username: String) -> APIResult<Vec<Repository>> {
    let response = make_get_request(
        URL::WithBaseUrl(format!("users/{}/repos", username)),
        None,
        None,
    )?;
    let response: Vec<Repository> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_user_profile(username: String, token: Option<&str>) -> APIResult<GithubUser> {
    let response = make_get_request(URL::WithBaseUrl(format!("users/{}", username)), token, None)?;
    let response: GithubUser = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub async fn generate_new_window(
    handle: tauri::AppHandle,
    url: String,
    label: String,
    title: String,
) {
    let _new_window = tauri::WindowBuilder::new(
        &handle,
        label, /* the unique window label */
        tauri::WindowUrl::External(url.parse().unwrap()),
    )
    .title(title)
    .build()
    .unwrap();
}

#[tauri::command]
pub fn call_api_method(
    request: ApiRequest,
    token: Option<&str>,
) -> APIResult<serde_json::Value> {
    let endpoint: String = match request.query {
        Some(object) => {
            let mut query_params: String = String::new();
            for (key, value) in object.into_iter() {
                query_params = format!("{}{}={}&", query_params, key, value);
            }
            let url = format!("{}?{}", request.url, query_params);
            url 
        }
        None => request.url,
    };

    if request.method == "POST".to_string() {
        let response: serde_json::Value =
            match make_post_request(URL::WithoutBaseUrl(endpoint), token, request.body, request.headers) {
                Ok(result) => serde_json::to_value(result).unwrap(),
                Err(error) => {
                    println!("Error in POST request {:?}", error);
                    serde_json::Value::default()
                }
            };
        Ok(response)
    } else {
        let response: serde_json::Value =
            match make_get_request(URL::WithoutBaseUrl(endpoint), token, request.headers) {
                Ok(result) => serde_json::to_value(&result).unwrap(),
                Err(error) => {
                    println!("Error in GET request {:?}", error);
                    serde_json::Value::default()
                }
            };
        Ok(response)
    }
}

#[tauri::command]
pub fn get_auth_state(state: State<AuthState>) -> Value {
    let auth = serde_json::json!(*state);
    auth
}

#[tauri::command]
pub fn set_auth_state(auth_tokens: AuthTokens, state: State<AuthState>) -> bool {
    let mut auth = state.tokens.lock().unwrap();
    *auth = auth_tokens;
    true
}

// #[tauri::command]
// pub fn get_repo_readme(owner: String, repo_name: String) -> APIResult<String> {

// }
