import { Button, Checkbox, FormInstance, Table, TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/interface";
import { User } from "../../services/users/interface";
import { getUser } from "../../services/users";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import { getIdentityCardNumberValue } from "../../components/input/identity-card-number";
import dayjs from "dayjs";

const UserTable = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selected, set_selected] = React.useState<React.Key[]>([]);

  const users = useSelector((state: Store) => state.users);

  const columns: TableColumnsType<User> = [
    {
      title: t("name"),
      render: (record) => {
        const first_name = record.first_name || "-";
        const last_name = record.last_name || "-";
        return (
          t(record.prefix.toLowerCase()) + " " + first_name + " " + last_name
        );
      },
      sorter: {
        compare: (a, b) =>
          (a.first_name + " " + a.last_name).localeCompare(
            b.first_name + " " + b.last_name
          ),
      },
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      render: (value) => t(value),
      sorter: {
        compare: (a, b) =>
          t(a.gender.toLocaleLowerCase()).localeCompare(
            t(b.gender.toLocaleLowerCase())
          ),
      },
    },
    {
      title: t("last_name"),
      dataIndex: "phone_number",
      sorter: {
        compare: (a, b) => a.phone_number.localeCompare(b.phone_number),
      },
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      render: (value) => t(value.toLowerCase()),
      sorter: {
        compare: (a, b) =>
          t(a.nationality.toLocaleLowerCase()).localeCompare(
            t(b.nationality.toLocaleLowerCase())
          ),
      },
    },
    {
      title: t("management"),
      render: (record) => {
        return (
          <div className="flex gap-2">
            <Button onClick={() => onEdit(record.id)}>
              <EditOutlined />
            </Button>
            <Button onClick={() => onDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const onEdit = (id: string) => {
    const get_user = getUser(id);
    const user = getIdentityCardNumberValue(get_user);
    return form.setFieldsValue({ ...user, dob: dayjs(get_user.dob) });
  };

  const onDelete = (id: string) => {
    return dispatch({
      type: "users/delete",
      payload: id,
    });
  };

  const onMultipleDelete = () => {
    return dispatch({
      type: "users/multipleDelete",
      payload: selected,
    });
  };

  const onSelectAll = (checked: boolean) => {
    if (checked) return set_selected(users.map((user) => user.id));
    return set_selected([]);
  };

  const rowSelection = {
    selectedRowKeys: selected,
    onChange: (selectedRowKeys: React.Key[]) => {
      set_selected(selectedRowKeys);
    },
  };

  return (
    <div className="flex flex-col gap-4 px-20">
      <div>
        <Checkbox onChange={(e) => onSelectAll(e.target.checked)}>
          {t("check_all")}
        </Checkbox>
        <Button onClick={onMultipleDelete}>{t("delete_all")}</Button>
      </div>
      <div>
        <Table
          rowKey="id"
          dataSource={users}
          columns={columns}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>
    </div>
  );
};

export default UserTable;
