import { Button } from "components";
import { Delete, Edit, CreateDoc } from "assets/images/icons";
import { useHooks, usePost } from "hooks";
import { useState } from "react";
import { Modal, notification } from "antd";

const Test = () => {
  const { get, queryClient, t, navigate } = useHooks();
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы уверены что хотите удалить?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/difficulties/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["difficulties"] });
            notification.success({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error) => {
            notification.error({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div>
      <Button
        title={t("Create test")}
        icon={<CreateDoc />}
        size="large"
        className="bg-[#002855]"
        onClick={() => navigate('/test/create')}
      />
    </div>
  )
}

export default Test