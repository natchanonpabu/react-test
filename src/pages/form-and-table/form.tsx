import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import IdentityCardNumberInput, {
  setIdentityCardNumberValue,
} from "../../components/input/identity-card-number";
import code_country from "../../config/code-country";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const UserForm = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const set_identity = setIdentityCardNumberValue(values);
    const user = {
      ...set_identity,
      dob: dayjs(values.dob).format(),
    };

    if (!values.id) {
      dispatch({
        type: "users/create",
        payload: user,
      });
    } else {
      dispatch({
        type: "users/update",
        payload: user,
      });
    }

    form.resetFields();
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 rounded-lg border-2 border-solid border-primary-gray">
        <Form form={form} className="p-4" requiredMark onFinish={onFinish}>
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <div className="flex gap-4">
            <Form.Item
              name="prefix"
              label={t("prefix")}
              rules={[{ required: true }]}
            >
              <Select
                className="!w-24"
                options={[
                  { value: "Mr", label: t("mr") },
                  { value: "Mrs", label: t("mrs") },
                  { value: "Miss", label: t("miss") },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="first_name"
              label={t("first_name")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label={t("last_name")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item
              name="dob"
              label={t("date_of_birth")}
              rules={[{ required: true }]}
            >
              <DatePicker
                disabledDate={(day) =>
                  day.isAfter(dayjs()) || day.isSame(dayjs(), "day")
                }
              />
            </Form.Item>
            <Form.Item
              name="nationality"
              label={t("nationality")}
              rules={[{ required: true }]}
            >
              <Select
                className="!w-24"
                options={[
                  { value: "Thai", label: t("thai") },
                  { value: "Other", label: t("other") },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <IdentityCardNumberInput />
          </div>
          <div>
            <Form.Item
              name="gender"
              label={t("gender")}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="male">{t("male")}</Radio>
                <Radio value="female">{t("female")}</Radio>
                <Radio value="not_specified">{t("not_specified")}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item
              name="phone_number_prefix"
              label={t("phone_number")}
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                className="!w-24"
                options={code_country.map((e) => ({
                  label: `+${e}`,
                  value: `+${e}`,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: t("please_enter_phone_number"),
                },
                {
                  pattern: /^\d+$/,
                  message: t("please_input_a_valid_phone_number"),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="passport_number" label={t("passport")}>
              <Input />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-4">
            <Form.Item
              name="expected_salary"
              label={t("expected_salary")}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Button onClick={() => form.resetFields()}>
              {t("clear_data")}
            </Button>
            <Button htmlType="submit">{t("send_data")}</Button>
            <div className="w-24"></div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
