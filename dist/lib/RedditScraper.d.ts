import { IRedditCredentials, IRequestOptions, IPageListingResults } from "./RedditScraper.types";
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
