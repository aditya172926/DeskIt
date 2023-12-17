export interface Commit {
    commit: Nullable<CommitNode>;
}

export interface CommitNode {
    message: string;
}

export interface CodeSnippet {
    language: string;
    content: string;
}

export interface GithubUser {
    avatar_url: string;
    login: string;
}

export interface GithubItem {
    id?: string;
    owner: GithubUser;
    description: string;
}

export interface GistInput {
    description: Nullable<string>;
    files: {filename: string, content: string}[];
    isPublic: boolean
}

export interface GistFile {
    filename: string;
    language: Nullable<string>;
    raw_url: string;
}

export interface Gist extends GithubItem {
    isPublic: boolean;
    files: GistFile[];
}



export type Nullable<T> = T | null;