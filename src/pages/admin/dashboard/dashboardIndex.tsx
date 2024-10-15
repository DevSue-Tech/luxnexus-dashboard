import { Row, Col } from "antd";
import {
  UsergroupAddOutlined,
  PieChartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import RecentOrdersTable from "../components/recent-orders/recentOrders";

const DashboardIndex = () => {
  return (
    <div>
      <Row className="w-full font-main flex gap-6 flex-wrap">
        <Col className=" w-[20%] bg-[#434343] rounded-2xl gap-1 h-[100px] flex flex-col justify-center items-center">
          <h5 className=" text-white text-xs font-bold">Total Users</h5>
          <UsergroupAddOutlined className=" text-4xl text-white" />

          <h1 className=" text-white font-bold">100</h1>
        </Col>
        <Col className="w-[50%] gap-2 bg-[#434343] rounded-2xl h-[120px] flex flex-col justify-center items-center">
          <h5 className=" text-white text-xs font-bold">Annual Revenue</h5>
          <PieChartFilled className=" text-2xl text-white" />
          <h1 className=" text-white font-bold text-xl">$10k+ in sales</h1>
        </Col>
        <Col className=" w-[20%] bg-[#434343] rounded-2xl h-[100px] flex flex-col justify-center items-center">
          <h5 className=" text-white text-xl font-bold">Orders</h5>
          <ShoppingCartOutlined className=" text-2xl text-white" />

          <h1 className=" text-white text-xl font-bold">20</h1>
        </Col>
      </Row>

      <section className=" mt-24 font-main flex flex-col gap-4">
        <h1 className=" font-bold text-white">Recent Orders from Store</h1>

        <RecentOrdersTable />
      </section>
    </div>
  );
};

export default DashboardIndex;
