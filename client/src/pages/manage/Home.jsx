import React, { useEffect, useState } from "react";
import LineChart from "./LineChart ";
import productRest from "../../api/ProductRest";
import { Col, Row } from "antd";

function Home() {
  const [label, setLaBel] = useState([]);
  const [dataChartQty, setDataChartQty] = useState([]);
  const [dataChartRevenue, setDataChartRevenue] = useState([]);
  const [sumQty, setSumQty] = useState(0);
  const [sumRevenue, setSumRevenue] = useState(0);

  const [mode, setMode] = useState(false);
  useEffect(() => {
    const getTopSelleing = async () => {
      try {
        const { data } = await productRest.topSalling();
        let sum1 = 0;
        let sum2 = 0;
        data.forEach((c) => {
          setLaBel((prev) => [...prev, c.productName]);
          setDataChartQty((prev) => [...prev, c.totalQuantitySold]);
          sum1 += c.totalQuantitySold;
          setDataChartRevenue((prev) => [...prev, c.revenue]);
          sum2 += c.revenue;
        });
        setSumQty(sum1);
        setSumRevenue(sum2);
      } catch (error) {
        alert(error.message);
      }
    };
    getTopSelleing();
  }, [mode]);
  const dataQty = {
    labels: label,
    datasets: [
      {
        label: "10 sản phẩm bán nhiều nhất. ",
        data: dataChartQty,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const dataRevenue = {
    labels: label,
    datasets: [
      {
        label: "Doanh thu  10 sản phẩm bán nhiều nhất. ",
        data: dataChartRevenue,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.data?.sellers) {
    return (
      <div
        className="text-center align-middle flex flex-col justify-center"
        style={{ height: "60vh" }}
      >
        <h3 className="font-bold text-yellow-yody text-3xl">
          Bạn không có quyền truy cập trang này.
        </h3>
      </div>
    );
  }
  return (
    <div className="container m-auto">
      <Row>
        <Col span={12}>
          <LineChart data={dataQty} />
          <div className="text-center">Số lượng bán : {sumQty}</div>
        </Col>
        <Col span={12}>
          <LineChart data={dataRevenue} />
          <div className="text-center">Số lượng bán : {sumRevenue}vnd</div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
