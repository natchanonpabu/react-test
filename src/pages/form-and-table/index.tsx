import { useTranslation } from "react-i18next";
import PageContainer from "../../layouts/page-container";
import { Form } from "antd";
import UserForm from "./form";
import UserTable from "./table";

const FormAndTable = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  return (
    <PageContainer title={t("form_and_table")}>
      <div className="flex flex-col gap-6">
        <UserForm form={form} />

        <UserTable form={form} />
      </div>
    </PageContainer>
  );
};

export default FormAndTable;
