import { Button, Table } from "antd";
import { useGetBlog } from "../Hooks/api";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";


const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Content", dataIndex: "content", key: "content" },
  { title: "Author", dataIndex: "author", key: "author" },
  { title: "Date", dataIndex: "date", key: "date" },
];
const Blog = () => {
  const { data, isLoading, error } = useGetBlog();
  console.log("Blog Data:", data);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Error: {"Something went wrong"}
      </div>
    );
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />
      <Link to="/">
      <Button icon={<ArrowLeftOutlined />}>Back to home</Button>
      </Link>
    </>
  );
};

export default Blog;
