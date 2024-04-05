import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByPrice } from "../redux/productAction";

const Filter = () => {
  const priceRange = [
    {
      title: "Nhỏ hơn 100.000đ",
      value: [0, 100000],
    },
    {
      title: "Từ 100.000đ - 200.000đ",
      value: [100000, 200000],
    },
    {
      title: "Từ 200.000đ - 350.000đ",
      value: [200000, 350000],
    },
    {
      title: "Từ 350.000đ - 500.000đ",
      value: [350000, 500000],
    },
    {
      title: "Từ 500.000đ - 700.000đ",
      value: [500000, 700000],
    },
    {
      title: "Lớn hơn 700.000đ",
      value: [700000, 200000000],
    },
  ];
  const [size, setSize] = useState(false);
  const [color, setColor] = useState(false);
  const dispatch = useDispatch();

  const filterByPrice = (price) => {
    dispatch(getProductByPrice(price));
  };
  return (
    <div className="pr-12">
      <div>
        <div className="flex justify-between mb-2">
          <h4>Kích thước</h4>
          {!size ? (
            <DownOutlined onClick={() => setSize(!size)} />
          ) : (
            <UpOutlined onClick={() => setSize(!size)} />
          )}
        </div>
        {size ? (
          <div className="flex gap-4">
            <span className="bg-btn-filter px-4 py-2 rounded-md">SM</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">M</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">L</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">XL</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">2XL</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <div className="flex justify-between">
          <h4>Màu sắc</h4>
          {!color ? (
            <DownOutlined onClick={() => setColor(!color)} />
          ) : (
            <UpOutlined onClick={() => setColor(!color)} />
          )}
        </div>
        {color ? (
          <div className="flex gap-4">
            <span className="bg-btn-filter px-4 py-2 rounded-md">Xanh</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">Do</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">Den</span>
            <span className="bg-btn-filter px-4 py-2 rounded-md">Trang</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <div className="flex justify-between">
          <h4>Khoảng giá (VNĐ)</h4>
        </div>
        {priceRange.map((data, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <input
                type="radio"
                name="price"
                value={data.value}
                onChange={() => {
                  filterByPrice(data.value);
                }}
              />
              <p>{data.title}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <div className="flex gap-3 align-middle items-center ">
          <h4>Xắp xếp</h4>
          <select className="block bg-btn-filter  p-2 ">
            <option value=""></option>
            <option value="asc">Tăng dần</option>
            <option value="dasc">Giảm dần</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filter;
