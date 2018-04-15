# Reddit Scraper

## Instructions

1. Create an App in https://www.reddit.com/prefs/apps/
    * Type should be `script`
    * `redirect uri` does not matter
2. Get the App Id (Under the App's Name)
3. Get the App Secret

## Example

```javascript
const RedditScraper = require("reddit-scraper");

(async () => {
 
    const redditScraperOptions = {
        AppId: "appId",
        AppSecret: "appSecret",
    };
 
    const requestOptions = {
        Pages: 5,
        Records: 25,
        SubReddit: "javascript",
        SortType: "hot",
    };
 
    try {
        const redditScraper = new RedditScraper.RedditScraper(redditScraperOptions);
        const scrapedData = await redditScraper.scrapeData(requestOptions);
        console.log(scrapedData);
    } catch (error) {
        console.error(error);
    }
 
})();
```

```typescript
import {
	RedditScraper,
	IPageListingResults,
	IRequestOptions,
	IRedditCredentials,
} from "reddit-scraper";

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
```

