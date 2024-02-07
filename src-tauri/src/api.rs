use std::collections::HashMap;

use crate::models::{APIResult, URL};
use reqwest::header::{HeaderMap, HeaderValue, HeaderName, ACCEPT, AUTHORIZATION, USER_AGENT};
use serde::Serialize;

fn construct_headers(token: Option<&str>, custom_header: Option<HashMap<String, String>>) -> HeaderMap {
    let mut headers = HeaderMap::new();

    headers.insert(
        ACCEPT,
        HeaderValue::from_static("application/vnd.github+json"),
    );
    headers.insert(USER_AGENT, HeaderValue::from_static("Dashhub demo"));
    headers.insert("X-GitHub-Api-Version", HeaderValue::from_static("2022-11-28"));

    let mut headers_map: &'static HashMap<String, String> = match custom_header {
        Some(headers) => &headers.clone(),
        None => &HashMap::new()
    };

        for (header_key, header_value) in &headers_map {
            // let key = header_key.to_owned();
            // let value = header_value;
            headers.insert(HeaderName::from_static(&header_key), HeaderValue::from_static(&header_value));
        };
    
    

    if let Some(token) = token {
        let token = format!("Bearer {token}");
        let header_value =
            HeaderValue::from_str(token.as_str()).expect("Could not generate header from value");
        headers.insert(AUTHORIZATION, header_value);
    }
    headers
}

pub fn make_get_request(url: URL, token: Option<&str>) -> APIResult<String> {
    let url = url.value();
    let client = reqwest::blocking::Client::new();
    let response = client.get(url).headers(construct_headers(token, None)).send()?;
    let response_body = response.text()?;
    Ok(response_body)
}

pub fn make_post_request<T: Serialize>(
    url: URL,
    token: Option<&str>,
    data: Option<T>,
    headers: Option<HashMap<String, String>>
) -> APIResult<String> {
    let url = url.value();
    let client = reqwest::blocking::Client::new();
    let response = client
        .post(url)
        .json(&data)
        .headers(construct_headers(token, headers))
        .send()?;
    let response_body = response.text()?;
    Ok(response_body)
}
