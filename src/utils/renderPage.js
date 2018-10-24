import React from "react";
import {Provider} from "react-redux";
import {StaticRouter as Router} from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import getWebpackStats from "./extras";
import config from "config";
import _ from "lodash";
import configureStore from "./configureStore";
import HtmlDocument from "./html";
import Routes from "./renderRoutes";
import translations from "../locale/index";
import Cookies from "cookies";
import {createCookieMiddleware} from "redux-cookie";
import {getData} from "./fetchData";
import getLanguage from "./getLanguage";
import {matchRoutes} from "react-router-config";

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

export const renderAdmin = (req, res) => {
    const {user} = req;
    let initialState = {
        session: {isLoggedIn: false}
    };
    if (user) {
        const {firstName, lastName, userType, can = ""} = user;
        initialState = {
            session: {
                isLoggedIn: true,
                user: {
                    firstname: firstName,
                    lastname: lastName,
                    userType: userType,
                    can: can
                }
            }
        };
    }
    const cookies = new Cookies(req, res);
    const language = cookies.get("lang") || "en_US";
    const lang = getLanguage(req.query, language);
    const Pages = require(`ff-clients/admin/routes`).default;
    const models = require(`ff-clients/admin/models`).default;
    const navOpenKeys = cookies.get("navOpenKeys") || "";
    cookies.set("lang", lang, {httpOnly: false, overwrite: true});
    cookies.set("type", "admin", {httpOnly: false, overwrite: true});

    _.extend(initialState.session, {
        home: req.headers.host
    });

    const context = {
        i18nState: {
            lang: lang,
            translations: translations[lang]
        },
        handleNavOpenKeys: {navOpenKeys: navOpenKeys},
        ...initialState
    };

    const branch = matchRoutes(Pages, req.originalUrl);
    const promises = branch.map(({match, route}) => {
        let {fetchData = {}} = route.component;
        let {params} = match;
        let {user = {}} = req;
        _.extend(params, {
            user: user
        });
        return fetchData instanceof Function
            ? store.dispatch(getData(fetchData(params), user))
            : Promise.resolve(null);
    });

    const store = configureStore(context, models, createCookieMiddleware(cookies));
    Promise.all(promises)
        .then(data => {
            let content = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <Router location={req.originalUrl} context={context}>
                        <Routes initialLang={lang} pages={Pages}/>
                    </Router>
                </Provider>
            );
            const htmlMarkup = ReactDOMServer.renderToStaticMarkup(
                <HtmlDocument
                    webpackStats={getWebpackStats("admin")}
                    content={content}
                    state={store.getState()}
                    host={config.home}
                />
            );
            res.status(200).end("<!DOCTYPE html>" + htmlMarkup);
        })
        .catch(e => {
            console.log(e);
            res.send({Error: "500"});
        });
};
