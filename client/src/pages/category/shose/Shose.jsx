import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../../components/product/ProductItem";
import Filter from "../../../components/Filter";
import { getProductByCategory } from "../../../redux/productAction";
function Shose() {
  const dispatch = useDispatch();
  const page = 1;
  const limit = 12;
  useEffect(() => {
    dispatch(getProductByCategory({ page, limit, category: "ao" }));
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  return (
    <div className="my-[50px] container m-auto">
      <div>
        <div className="text-center font-bold my-12 ">
          <h2 className="text-yellow-yody text-3xl">
            POLO YODY - THOẢI MÁI, TỰ TIN MỌI LÚC MỌI NƠI{" "}
          </h2>
        </div>

        <div className="flex">
          <div style={{ width: "20%", height: "300px" }}>
            <Filter />
          </div>
          <div style={{ width: "80%" }} className="grid-container">
            {products?.map((item, index) => (
              <ProductItem key={item.pid} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shose;
