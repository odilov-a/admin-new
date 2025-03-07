import { Button, DotBtn } from "components";
import { CreateDoc } from "assets/images/icons";
import { useHooks, usePost } from "hooks";
// import { useState } from "react";
import { Modal, notification, Table } from "antd";
import Container from "modules/container";

const Test = () => {
  const { get, queryClient, t, navigate } = useHooks();
  // const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();

  const onDeleteHandler = (row: any) => {
    const id = get(row, "_id");
    Modal.confirm({
      title: t("O'chirishni tasdiqlaysizmi") + "?",
      cancelText: t("yo'q"),
      okType: "danger",
      okText: t("ha"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: any) => {
    if (id) {
      mutate(
        { method: "delete", url: `/tests/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`tests`],
            });
            notification["success"]({
              message: t("Успешно удален!"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: t(
                get(error, "response.data.error", "Произошло ошибка!")
              ),
              duration: get(error, "response.data.message") ? 4 : 2,
            });
          },
        }
      );
    }
  };

  return (
    <div>
      <Container.All
        url="/tests"
        name="tests"
      // params={{
      //   limit: 5,
      //   page,
      //   extra: {
      //     search: searchQuery,
      //     start: params.start && params.start,
      //     end: params.end && params.end
      //   }
      // }}
      >
        {({ meta, items }) => {
          return (
            <div>
              <div className="page-heading">
                <div className="page-heading__right">
                  <Button
                    title={t("Create test")}
                    icon={<CreateDoc />}
                    size="large"
                    className="bg-[#002855]"
                    onClick={() => navigate('/test/create')}
                  />
                </div>
              </div>
              <Table
                dataSource={items}
                pagination={{ pageSize: 12 }}
                columns={[
                  {
                    key: "name",
                    align: "left",
                    title: t("Name"),
                    dataIndex: "name",
                    className: "w-[80px]",
                    render: (value) => (
                      <div className="flex items-center">{value}</div>
                    ),
                  },
                  {
                    key: "subject",
                    align: "left",
                    title: t("Subject"),
                    dataIndex: "subject",
                    className: "w-[80px]",
                    render: (value) => (
                      <div className="flex items-center">{value}</div>
                    ),
                  },
                  {
                    key: "point",
                    align: "left",
                    title: t("Point"),
                    dataIndex: "point",
                    className: "w-[80px]",
                    render: (value) => (
                      <div className="flex items-center">{value}</div>
                    ),
                  },
                  {
                    title: t("Amallar"),
                    align: "center",
                    className: "w-[1px]",
                    render: (value, row) => (
                      <DotBtn
                        row={row}
                        editFunction={() =>
                          navigate(`/test/update/${get(row, "_id")}`)
                        }
                        deleteFunction={() => onDeleteHandler(row)}
                      />
                    ),
                  },
                ]}
              />
              {/* {meta && meta.perPage && (
                    <div className="pt-[20px] flex justify-end">
                      <Pagination
                        current={meta.currentPage}
                        pageSize={meta.perPage}
                        total={meta.totalCount}
                        onChange={setPage}
                      />
                    </div>
                  )} */}
            </div>
          );
        }}
      </Container.All>
    </div>
  )
}

export default Test