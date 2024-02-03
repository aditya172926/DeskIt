use crate::api::{make_get_request, make_post_request};
use crate::error::TauriError;
use crate::models::{
    APIResult, AuthState, AuthTokens, Commit, Gist, GistInput, GithubUser, NewGistResponse, Repository, URL
};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use std::process::exit;
use tauri::{App, State};

#[tauri::command]
pub fn get_public_gists() -> APIResult<Vec<Gist>> {
    let response = make_get_request(URL::WithBaseUrl(String::from("gists")), None)?;
    let response: Vec<Gist> = serde_json::from_str(&response).unwrap();
    Ok(response)
}

#[tauri::command]
pub fn get_public_repositories() -> APIResult<Vec<Repository>> {
    let response = match make_get_request(URL::WithBaseUrl(String::from("repositories")), None) {
        Ok(repositories) => repositories,
        Err(error) => {
            println!("Error in get_public_repositories API {:?}", &error);
            String::new()
        }
    };
    let response: Vec<Repository> = match serde_json::from_str(&response) {
        Ok(result) => result,
        Err(error) => {
            println!("Error in serializing Public repositories {:?}", &error);
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
    )?;
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
    let response = make_post_request(
        URL::WithBaseUrl(String::from("gists")),
        Some(token),
        Some(gist),
    )?;
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
    method: String,
    url: String,
    token: Option<&str>,
    query: Option<HashMap<String, String>>,
    data: Option<serde_json::Value>,
) -> APIResult<serde_json::Value> {
    let endpoint: String = match query {
        Some(object) => {
            let mut query_params: String = String::new();
            for (key, value) in object.into_iter() {
                query_params = format!("{}{}={}&", query_params, key, value);
            }
            println!("The query params are {}", query_params);
            let url = format!("{}?{}", url, query_params);
            url
        },
        None => url
    };

    if method == "POST".to_string() {
        let response: serde_json::Value = match make_post_request(URL::WithoutBaseUrl(endpoint), token, data) {
            Ok(result) => {
                println!("The Result is {:?}", result);
                serde_json::to_value(result).unwrap()},
            Err(error) => {
                println!("Error in POST request {:?}", error);
                serde_json::Value::default()
            }
        };
        Ok(response)
    } else {
        let response: serde_json::Value = match make_get_request(URL::WithoutBaseUrl(endpoint), token) {
            Ok(result) => serde_json::from_str(&result).unwrap(),
            Err(error) => {
                println!("Error in GET request {:?}", error);
                serde_json::Value::default()
            }
        };
        Ok(response)
    }
}

#[tauri::command]
pub fn set_auth_state(authTokens: AuthTokens, authState: State<AuthState>) -> bool {
    let mut state = authState.tokens.lock().unwrap().insert("authTokens".to_string(), authTokens);
    true
}

// #[tauri::command]
// pub fn get_repo_readme(owner: String, repo_name: String) -> APIResult<>