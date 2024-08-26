import { useRoutes } from "react-router-dom";
import React from "react";
import APP_ROUTES from "./routes";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import en_US from "antd/lib/locale/en_US";
import th_TH from "antd/lib/locale/th_TH";
import { Locale } from "antd/lib/locale";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import th from "dayjs/locale/th";

const AppRoute = () => {
  const appRoute = useRoutes(APP_ROUTES);
  return appRoute;
};

function App() {
  const {
    i18n: { language },
  } = useTranslation();

  const ant_locales: { [key: string]: Locale } = {
    en: en_US,
    th: th_TH,
  };

  const dayjs_locales: { [key: string]: any } = {
    en: en,
    th: th,
  };

  React.useEffect(() => {
    dayjs.locale(dayjs_locales[language]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <React.Fragment>
      <ConfigProvider locale={ant_locales[language]}>
        <AppRoute />
      </ConfigProvider>
    </React.Fragment>
  );
}
export default App;
