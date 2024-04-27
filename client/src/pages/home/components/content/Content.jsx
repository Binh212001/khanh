import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../../../components/Filter";
import ProductItem from "../../../../components/product/ProductItem";
import { getProductActive } from "../../../../redux/productAction";

function Content() {
  const [current, setCurrent] = useState(1);
  const limit = 16;
  const dispatch = useDispatch();
  const { products, count, loading } = useSelector((state) => state.product);
  console.log("🚀 ~ Content ~ loading:", loading);

  useEffect(() => {
    dispatch(
      getProductActive({
        limit,
        page: current - 1,
      })
    );
  }, [dispatch, current]);

  const changePage = (currentPage) => {
    setCurrent(currentPage);
  };

  return (
    <div className="my-[50px]">
      <div>
        {/* <div className="text-center font-bold my-12 ">
          <h2 className="text-yellow-yody text-3xl">
            POLO YODY - THOẢI MÁI, TỰ TIN MỌI LÚC MỌI NƠI{" "}
          </h2>
        </div> */}

        <div className="flex">
          <div style={{ width: "20%", height: "300px" }}>
            <Filter />
          </div>
          {loading ? (
            <div
              style={{ minHeight: "50vh" }}
              className="flex flex-col justify-center items-center text-center m-auto"
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
              />
            </div>
          ) : (
            <div style={{ width: "80%" }}>
              <h2 className="font-bold  text-yellow-yody text-4xl   mb-4">
                HÀNG MỚI VỀ
              </h2>
              <div className="grid-container">
                {products?.map((item, index) => {
                  if (index > 4 && index < 9) {
                    return (
                      <ProductItem
                        key={item.pid}
                        data={item}
                        hot={true}
                        newProduct={true}
                      />
                    );
                  }
                  return null;
                })}
              </div>

              <h2 className="font-bold  text-yellow-yody text-4xl mb-4">
                SẢN PHẨM HOT
              </h2>
              <div className="grid-container">
                {products?.map((item, index) => {
                  if (index < 4) {
                    return (
                      <ProductItem key={item.pid} data={item} hot={true} />
                    );
                  }
                  return null;
                })}
              </div>

              <h2 className="font-bold  text-yellow-yody text-4xl  m-7">
                POLO YODY - THOẢI MÁI, TỰ TIN MỌI LÚC MỌI NƠI{" "}
              </h2>
              <div className="grid-container">
                {products?.map((item, index) => (
                  <ProductItem key={item.pid} data={item} hot={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <Pagination
          total={count}
          pageSize={limit}
          current={current}
          onChange={(currentPage) => changePage(currentPage)}
        />
      </div>
    </div>
  );
}

export default Content;
