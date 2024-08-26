import { Form, Input } from "antd";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

const IdentityCardNumberInput = () => {
  const { t } = useTranslation();

  const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      return document.getElementById("identity_card_number_2")?.focus();
  };

  const onChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 4)
      return document.getElementById("identity_card_number_3")?.focus();
    if (e.target.value.length === 0)
      return document.getElementById("identity_card_number_1")?.focus();
  };

  const onChange3 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 5)
      return document.getElementById("identity_card_number_4")?.focus();
    if (e.target.value.length === 0)
      return document.getElementById("identity_card_number_2")?.focus();
  };

  const onChange4 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 2)
      return document.getElementById("identity_card_number_5")?.focus();
    if (e.target.value.length === 0)
      return document.getElementById("identity_card_number_3")?.focus();
  };

  const onChange5 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0)
      return document.getElementById("identity_card_number_4")?.focus();
  };

  return (
    <div className="flex gap-2">
      <Form.Item
        name="identity_card_number_1"
        label={t("identity_card_number")}
        rules={[
          {
            pattern: /^\d+$/,
            message: t("please_input_a_valid_identity_card_number"),
          },
        ]}
      >
        <Input maxLength={1} onChange={onChange1} />
      </Form.Item>
      <Form.Item>-</Form.Item>
      <Form.Item
        name="identity_card_number_2"
        rules={[
          {
            pattern: /^\d+$/,
            message: t("please_input_a_valid_identity_card_number"),
          },
        ]}
      >
        <Input maxLength={4} onChange={onChange2} />
      </Form.Item>
      <Form.Item>-</Form.Item>
      <Form.Item
        name="identity_card_number_3"
        rules={[
          {
            pattern: /^\d+$/,
            message: t("please_input_a_valid_identity_card_number"),
          },
        ]}
      >
        <Input maxLength={5} onChange={onChange3} />
      </Form.Item>
      <Form.Item>-</Form.Item>
      <Form.Item
        name="identity_card_number_4"
        rules={[
          {
            pattern: /^\d+$/,
            message: t("please_input_a_valid_identity_card_number"),
          },
        ]}
      >
        <Input maxLength={2} onChange={onChange4} />
      </Form.Item>
      <Form.Item>-</Form.Item>
      <Form.Item
        name="identity_card_number_5"
        rules={[
          {
            pattern: /^\d+$/,
            message: t("please_input_a_valid_identity_card_number"),
          },
        ]}
      >
        <Input maxLength={1} onChange={onChange5} />
      </Form.Item>
    </div>
  );
};

export const setIdentityCardNumberValue = (values: any) => {
  if (!values.identity_card_number_1) return values;

  const identity_card_number =
    values.identity_card_number_1 +
    values.identity_card_number_2 +
    values.identity_card_number_3 +
    values.identity_card_number_4 +
    values.identity_card_number_5;

  const next = Object.keys(values)
    .filter((e) => !e.startsWith("identity_card_number"))
    .reduce((p, c) => {
      return { ...p, [c]: values[c] };
    }, {});

  return { ...next, identity_card_number };
};

export const getIdentityCardNumberValue = (values: any) => {
  if (!values.identity_card_number) return values;

  const next = Object.keys(values)
    .filter((e) => !e.startsWith("identity_card_number"))
    .reduce((p, c) => {
      return { ...p, [c]: values[c] };
    }, {});

  const identity_card_number = [1, 4, 5, 2, 1].reduce((p, c, i) => {
    const length = Object.values(p).reduce((a, b) => a + b.length, 0);
    return {
      ...p,
      [`identity_card_number_${i + 1}`]: values.identity_card_number?.slice(
        0 + Object.values(p).reduce((a, b) => a + b.length, 0),
        length + c
      ),
    };
  }, {} as { [key: string]: string });

  return { ...next, ...identity_card_number };
};

export default IdentityCardNumberInput;
