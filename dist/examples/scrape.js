"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedditScraper_1 = require("../lib/RedditScraper");
(() => __awaiter(this, void 0, void 0, function* () {
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
        const redditScraper = new RedditScraper_1.RedditScraper(redditScraperOptions);
        const scrapedData = yield redditScraper.scrapeData(requestOptions);
        console.log(scrapedData);
    }
    catch (error) {
        console.error(error);
    }
}))();
//# sourceMappingURL=scrape.js.map