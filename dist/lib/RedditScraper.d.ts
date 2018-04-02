export interface IRedditCredentials {
    AppId: string;
    AppSecret: string;
}
export interface IRequestOptions {
    SubReddit: string;
    SortType: "hot" | "new" | "rising" | "top";
    Pages: number;
    Scan: "before" | "after";
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
        title: string;
        selftext: string;
    };
}
export interface IPageListingResults extends Array<IPageListingResult> {
}
export declare class RedditScraper {
    private AccessToken;
    private AuthToken;
    private NextPage;
    private PreviousPage;
    private static readonly API_URL;
    constructor(options: IRedditCredentials);
    private static createAuthToken(options);
    scrapeData(options: IRequestOptions): Promise<IPageListingResults>;
    private getPage(options);
    private getAccessToken();
}
