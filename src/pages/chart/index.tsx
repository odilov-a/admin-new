import { Row, Col } from "antd";
import LanguageDistributionChart from "./languageDistributionChart";

const Dashboard = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <LanguageDistributionChart />
      </Col>
    </Row>
  );
};

export default Dashboard;
