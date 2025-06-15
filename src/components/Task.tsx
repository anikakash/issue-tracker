import styled from "styled-components";
import { Button, Table, Tag } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useBlogStatistics } from "../Hooks/api";

const DataTable = styled.div`
  background-color: #ffffff;
  padding: 17px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

const Body = styled.div``;



const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status : string)=>{
      let color = 'default';
      if (status === 'Complete') color='success';
      else if(status === 'Pending') color = 'warning';
      else if(status === 'In Progress') color = 'processing';

      return(
        <Tag color={color} key={status}>
          {status}
        </Tag>
      )
    }
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];
const Tasks = () => {
  const { statistics, isLoading, error } = useBlogStatistics();
  console.log(statistics?.tasks);
  if (isLoading || !statistics) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <>
      <DataTable>
        <TableHead>
          <Title>Tasks</Title>
          <Button icon={<PlusCircleFilled />}>New Task</Button>
        </TableHead>
        <Body>
          <Table columns={columns} dataSource={statistics?.tasks} />
        </Body>
      </DataTable>
    </>
  );
};

export default Tasks;
