import { Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { setLanguage } from "../../services/i18n";

const PageContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const location = useLocation();

  const onChangeLanguage = (value: string) => {
    setLanguage(value);
    changeLanguage(value);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="flex flex-col items-end gap-2">
          <Select
            value={language}
            options={[
              { value: "en", label: t("en") },
              { value: "th", label: t("th") },
            ]}
            onChange={onChangeLanguage}
            className="w-24"
          />
          <Link
            to={"/"}
            style={{ display: location.pathname === "/" ? "none" : "" }}
          >
            <Button>{t("back_to_home")}</Button>
          </Link>
        </div>
      </div>
      <div className="h-[calc(100vh-104px)] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
export default PageContainer;
