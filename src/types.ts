export interface Commit {
    commit: Nullable<CommitNode>;
    committer: Nullable<Committer>
}

export interface CommitNode {
    message: string;
    author: {name: string}
}

export interface Committer {
    avatar_url: Nullable<string>
}

export interface Activity {
    activity: Nullable<ActivityNode>
}

export interface ActivityNode {
    id: string;
    ref: string;
    timestamp: string;
    activity_type: string;
    actor: ActivityActor;
}

export interface ActivityActor {
    login: string;
    avatar_url: Nullable<string>;
    url: Nullable<string>;
    repos_url: Nullable<string>;
}

export interface CodeSnippet {
    language: string;
    content: string;
}

export interface GithubUser {
    login: string;
    avatar_url: string;
    location: string;
    email: string;
    bio: string;
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

export interface NewGistResponse {
    id: string;
}

export type Nullable<T> = T | null;

export interface Repository extends GithubItem {
    name: string;
    stargazers_url: string;
    commits_url: string;
    contributors_url: string;
}