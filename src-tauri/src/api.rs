use reqwest::{
    blocking::{Client, Response},
    header::{HeaderMap, HeaderName, HeaderValue, ACCEPT, AUTHORIZATION, USER_AGENT},
};
use serde::Serialize;
use std::collections::HashMap;

use crate::models::{APIResult, URL};

fn construct_headers(
    token: Option<&str>,
    custom_headers: Option<HashMap<String, String>>,
) -> HeaderMap {
    let mut headers = HeaderMap::new();
    println!("The custom headers are {:?}", custom_headers);

    headers.insert(ACCEPT, HeaderValue::from_static("application/vnd.github+json"));
    headers.insert(USER_AGENT, HeaderValue::from_static("Deskhub"));
    headers.insert(
        "X-GitHub-Api-Version",
        HeaderValue::from_static("2022-11-28"),
    );

    if let Some(headers_result) = custom_headers {
        for (header_key, header_value) in headers_result {
            if let Ok(header_name) = HeaderName::from_bytes(header_key.as_bytes()) {
                headers.insert(header_name, HeaderValue::from_str(&header_value).unwrap());
            }
        }
        println!("The request headers are {:?}", headers);
    } else {
        println!("The custom headers are {:?}", custom_headers);
        println!("No custom headers");
    }

    if let Some(token) = token {
        let token: String = format!("Bearer {token}");
        let header_value: HeaderValue =
            HeaderValue::from_str(token.as_str()).expect("Could not generate header from value");
        headers.insert(AUTHORIZATION, header_value);
    }
    headers
}

pub fn make_get_request(
    url: URL,
    token: Option<&str>,
    headers: Option<HashMap<String, String>>,
) -> APIResult<String> {
    let url = url.value();
    let client: Client = Client::new();
    let response: Response = client
        .get(url)
        .headers(construct_headers(token, headers))
        .send()?;
    let response_body: String = match response.text() {
        Ok(result) => {
            result
        },
        Err(error) => {
            eprintln!("Error in get request response {:?}", error);
            String::new()
        }
    };
    Ok(response_body)
}

pub fn make_post_request<T: Serialize>(
    url: URL,
    token: Option<&str>,
    data: Option<T>,
    headers: Option<HashMap<String, String>>,
) -> APIResult<String> {
    let url: String = url.value();
    let client: Client = Client::new();
    let response: Response = client
        .post(url)
        .json(&data)
        .headers(construct_headers(token, headers))
        .send()?;
    let response_body: String = response.text()?;
    Ok(response_body)
}
