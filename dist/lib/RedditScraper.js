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
const buffer_1 = require("buffer");
const Request = require("request-promise-native");
class RedditScraper {
    constructor(options) {
        this.NextPage = null;
        this.PreviousPage = null;
        this.AuthToken = RedditScraper.createAuthToken(options);
    }
    static createAuthToken(options) {
        return buffer_1.Buffer.from(`${options.AppId}:${options.AppSecret}`).toString("base64");
    }
    scrapeData(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.BeforeDate) {
                options.BeforeDate = new Date();
            }
            this.AccessToken = yield this.getAccessToken();
            let finalPageListings = [];
            let recordCount = 0;
            do {
                const pageData = yield this.getPage(options);
                const listingIsBeforeDateRange = (page) => (page.data.created_utc < options.BeforeDate.getTime());
                const dataBeforeDateRange = pageData.filter(listingIsBeforeDateRange);
                finalPageListings = finalPageListings.concat(dataBeforeDateRange);
                options.FullName = this.NextPage;
                recordCount += options.Records;
            } while (options.FullName && recordCount < options.Pages * options.Records);
            return finalPageListings;
        });
    }
    getPage(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalUrl = `${RedditScraper.API_URL.GetData}${options.SubReddit}/${options.SortType}/`;
            const requestOptions = {
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
            const pageData = yield Request.get(finalUrl, requestOptions);
            this.NextPage = pageData.data.after;
            this.PreviousPage = pageData.data.before;
            return pageData.data.children;
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                formData: {
                    grant_type: "client_credentials",
                    device_id: "DO_NOT_TRACK_THIS_DEVICE",
                },
                json: true,
                headers: {
                    Authorization: `Basic ${this.AuthToken}`,
                },
            };
            const accessTokenData = yield Request.post(RedditScraper.API_URL.AccessToken, options);
            return accessTokenData.access_token;
        });
    }
}
RedditScraper.API_URL = {
    AccessToken: "https://www.reddit.com/api/v1/access_token",
    GetData: "https://oauth.reddit.com/r/",
};
exports.RedditScraper = RedditScraper;
//# sourceMappingURL=RedditScraper.js.map