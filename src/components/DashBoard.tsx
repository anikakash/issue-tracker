import { Col, Row, Table } from "antd";
import DataCard from "./atmos/DataCard";
import { useBlogStatistics } from "../Hooks/api";
import styled from "styled-components";

const DataTable = styled.div`
  background-color: #ffffff;
  padding: 17px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const columns = [
  {
    title: 'Task Number',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  }
]
const DashBoard = () => {
  const { statistics, isLoading, error } = useBlogStatistics();
  console.log(statistics?.tasks)
  if (isLoading || !statistics) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <DataTable>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <DataCard title="Total Task" value={statistics?.totalTasks} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DataCard title="Completed Tasks" value={statistics?.totalComplete} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DataCard title="Pending Tasks" value={statistics?.totalPending} />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={statistics?.tasks}
      />
    </DataTable>

  );
};

export default DashBoard;
