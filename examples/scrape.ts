import {
	RedditScraper,
	IPageListingResults,
	IRequestOptions,
	IRedditCredentials,
} from "../lib/RedditScraper";

(async () => {

	const redditScraperOptions: IRedditCredentials = {
		AppId: "appId",
		AppSecret: "appSecret",
	};

	const requestOptions: IRequestOptions = {
		Pages: 5,
		SubReddit: "subredditname",
		SortType: "hot",
		Scan: "after",
	};

	try {
		const redditScraper: RedditScraper = new RedditScraper(redditScraperOptions);
		const scrapedData: IPageListingResults = await redditScraper.scrapeData(requestOptions);

		console.log(scrapedData);
	} catch (error) {
		console.error(error);
	}

})();
