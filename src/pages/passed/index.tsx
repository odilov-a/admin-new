import { Table } from "antd";
import { Container } from "modules";
import { useHooks } from "hooks";

const Passed = () => {
  const { t } = useHooks();
  const columns = [
    {
      title: t("Student Name"),
      dataIndex: ["student", "name"],
      key: "studentName",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: t("Test Name"),
      dataIndex: ["test", "name"],
      key: "testName",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: t("Total Questions"),
      dataIndex: ["stats", "totalQuestions"],
      key: "totalQuestions",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: t("Correct Answers"),
      dataIndex: ["stats", "correctAnswers"],
      key: "correctAnswers",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: t("Incorrect Answers"),
      dataIndex: ["stats", "incorrectAnswers"],
      key: "incorrectAnswers",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: t("Created At"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Container.All name="passed" url="/passed">
        {({ items }) => (
          <div className="flex-grow overflow-auto">
            <Table
              columns={columns}
              dataSource={items}
              pagination={{ pageSize: 10 }}
              rowKey="_id"
              className="dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}
      </Container.All>
    </div>
  );
};

export default Passed;