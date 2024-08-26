import { Button as AntButton } from "antd";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../layouts/page-container";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="h-full flex items-center justify-center gap-4">
        <div className="w-1/3 grid grid-cols-2 gap-4">
          <Button
            title={t("test_1")}
            description={t("layout_and_style")}
            to={"/layout-and-style"}
          />
          <Button
            title={t("test_2")}
            description={t("form_and_table")}
            to={"/form-and-table"}
          />
        </div>
      </div>
    </PageContainer>
  );
};

const Button = ({
  title,
  description,
  to,
}: {
  title: string;
  description: string;
  to: string;
}) => {
  const navigate = useNavigate();

  return (
    <AntButton
      onClick={() => navigate(to)}
      className="h-fit w-full flex flex-col items-start p-4 gap-10 rounded-sm hover:!text-inherit hover:!border-white"
    >
      <span>{title}</span>
      <span>{description}</span>
    </AntButton>
  );
};

export default Home;
