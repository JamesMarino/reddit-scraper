import { Buffer } from "buffer";
import * as Request from "request-promise-native";
import {RequestPromiseOptions} from "request-promise-native";
import {
	IRedditCredentials,
	IRequestOptions,
	IAPIUrl,
	IAccessTokenResult,
	IPageListingResult,
	IPageListingResults,
} from "./RedditScraper.types";

export class RedditScraper {

	private AccessToken: string;
	private AuthToken: string;
	private NextPage: string | null = null;
	private PreviousPage: string | null = null;

	private static readonly API_URL: IAPIUrl = {
		AccessToken: "https://www.reddit.com/api/v1/access_token",
		GetData: "https://oauth.reddit.com/r/",
	};

	constructor(options: IRedditCredentials) {
		this.AuthToken = RedditScraper.createAuthToken(options);
	}

	private static createAuthToken(options: IRedditCredentials): string {
		return Buffer.from(`${options.AppId}:${options.AppSecret}`).toString("base64");
	}

	public async scrapeData(options: IRequestOptions): Promise<IPageListingResults> {

		if (!options.BeforeDate) {
			options.BeforeDate = new Date();
		}

		this.AccessToken = await this.getAccessToken();

		let finalPageListings: IPageListingResults = [];
		let recordCount: number = 0;

		do {
			const pageData = await this.getPage(options);

			const listingIsBeforeDateRange = (page: IPageListingResult) =>
					(page.data.created_utc < options.BeforeDate.getTime());

			const dataBeforeDateRange = pageData.filter(listingIsBeforeDateRange);

			finalPageListings = finalPageListings.concat(dataBeforeDateRange);
			options.FullName = this.NextPage;
			recordCount += options.Records;

		} while (options.FullName && recordCount < options.Pages * options.Records);

		return finalPageListings;
	}

	private async getPage(options: IRequestOptions): Promise<IPageListingResults> {

		const finalUrl: string = `${RedditScraper.API_URL.GetData}${options.SubReddit}/${options.SortType}/`;

		const requestOptions: RequestPromiseOptions = {
			json: true,
			headers: {
				"Authorization": `Bearer ${this.AccessToken}`,
				"User-Agent": "RedditScraper",
			},
		};

		if (options.FullName) {
			requestOptions.qs = {
				after: options.FullName,
			};
		}

		const pageData = await Request.get(finalUrl, requestOptions);
		this.NextPage = pageData.data.after;
		this.PreviousPage = pageData.data.before;

		return pageData.data.children;
	}

	private async getAccessToken(): Promise<string> {

		const options: RequestPromiseOptions = {
			formData: {
				grant_type: "client_credentials",
				device_id: "DO_NOT_TRACK_THIS_DEVICE",
			},
			json: true,
			headers: {
				Authorization: `Basic ${this.AuthToken}`,
			},
		};

		const accessTokenData: IAccessTokenResult = await Request.post(RedditScraper.API_URL.AccessToken, options);
		return accessTokenData.access_token;
	}

}
