export interface IRedditCredentials {
    AppId: string;
    AppSecret: string;
}
export interface IRequestOptions {
    SubReddit: string;
    SortType: "hot" | "new" | "rising" | "top";
    Pages: number;
    Records: number;
    BeforeDate?: Date;
    FullName?: string;
}
export interface IAPIUrl {
    AccessToken: string;
    GetData: string;
}
export interface IAccessTokenResult {
    access_token: string;
    expires_in: number;
}
export interface IPageListingResult {
    kind: string;
    data: {
        created: number;
        created_utc: number;
        title: string;
        selftext: string;
    };
}
export interface IPageListingResults extends Array<IPageListingResult> {
}
