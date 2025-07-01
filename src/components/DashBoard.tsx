import { Col, Row } from "antd";
import DataCard from "./atmos/DataCard";
import { useBlogStatistics } from "../Hooks/api";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import GithubStats from "./GithubStats";

const DataTable = styled.div`
  background-color: #ffffff;
  padding: 17px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const Boady = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TableView = styled.div`
  width: 60%;
  background: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: 500;
  color: #585757;
  border-bottom: 1px solid #f0f0f0;
`;
const TaskDate = styled.div`
  /* color: #8c8c8c; */
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 37%;
  padding: 20px;
  background: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DashBoard = () => {
  const { statistics, isLoading, error } = useBlogStatistics();
  // console.log(statistics?.tasks);

  const pendingTasks =
    statistics?.tasks?.filter((task) => task.status !== "Complete") || [];

  const pieData = [
    { name: "Completed", value: statistics?.totalComplete, color: "#4CAF50" },
    { name: "Pending", value: statistics?.totalPending, color: "#FFC107" },
    {
      name: "In Progress",
      value: statistics?.totalInProgress,
      color: "#6ad821",
    },
  ];
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
      <Boady>
        <TableView>
          <SectionTitle>Pending Tasks</SectionTitle>
          {pendingTasks.map((task, index) => (
            <TaskItem key={index}>
              <div>{task?.title}</div>
              <TaskDate>{task?.date}</TaskDate>
            </TaskItem>
          ))}
        </TableView>
        <ChartContainer>
          <SectionTitle>Tasks Completion</SectionTitle>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                payload={pieData.map((item) => ({
                  value: item.name,
                  type: "square",
                  color: item.color,
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Boady>

      <GithubStats/>
    </DataTable>
  );
};

export default DashBoard;
