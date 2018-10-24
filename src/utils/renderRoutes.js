import React from "react";
import SiteLayout from "./siteLayout";
import translations from "../locale/index";
import I18n from "ns-redux-i18n";
import DataLoader from "./dataLoader";

const renderRoutes = args => {
    return (
        <I18n translations={translations} initialLang={args.initialLang}>
            <SiteLayout>
                <DataLoader routes={args.pages} />
            </SiteLayout>
        </I18n>
    );
};
export default renderRoutes;
