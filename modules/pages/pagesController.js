const Url = require('url-parse');
const errorLog = require('../service').errorLog;
const pagesService = require('./pagesService');
const pages_list = ['home', 'about', 'contacts', 'profile', 'privacy-policy'];
const lang_list = ['uk-UA', 'en-GB', 'ru-RU'];

class PagesController {
    async userData(req, res) {
        const path_name = Url(req.url, true).pathname.replace(/\//g, "");
        const page_name = pages_list.includes(path_name) ? path_name : "home";
        const lang = lang_list.includes(req.cookies ? req.cookies["lang"] : undefined) ? req.cookies["lang"] : "uk-UA";

        await pagesService.getUser(req, res, page_name, lang)
            .then((DATA) => {
                res.render(page_name, { DATA });
            })
            .catch(async (error) => {
                errorLog(error, 'error', 'pages', req);
                res.render(page_name, { DATA : await pagesService.defaultUser(page_name, lang) });
                // res.status(500).send("500 (Internal Server Error)");
            });
    }
}

module.exports = new PagesController();
