import {RedditScraper} from "../lib/RedditScraper";
import {
	IPageListingResults,
	IRequestOptions,
	IRedditCredentials,
} from "../lib/RedditScraper.types";

(async () => {

	const redditScraperOptions: IRedditCredentials = {
		AppId: "appId",
		AppSecret: "appSecret",
	};

	const requestOptions: IRequestOptions = {
		Pages: 5,
		Records: 25,
		SubReddit: "javascript",
		SortType: "hot",
	};

	try {
		const redditScraper: RedditScraper = new RedditScraper(redditScraperOptions);
		const scrapedData: IPageListingResults = await redditScraper.scrapeData(requestOptions);
		console.log(scrapedData);
	} catch (error) {
		console.error(error);
	}

})();
