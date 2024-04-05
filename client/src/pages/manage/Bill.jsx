import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCustom from "../../custom/TableCustom";
import { getBills, getBillsByCus } from "../../redux/billAction";
import { Button, Input, Pagination } from "antd";
import billRest from "../../api/BillRest";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

function Bill() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const [listBillSelect, setListBillSelect] = useState([]);
  console.log("🚀 ~ Bill ~ listBillSelect:", listBillSelect);
  const [keyword, setKeyword] = useState("");

  const limit = 12;
  const { bills, count, billSearch } = useSelector((state) => state.bill);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBills({ limit, page: currentPage - 1 }));
  }, [dispatch, currentPage]);

  const changePage = (p) => {
    setCurrentPage(p);
  };

  const selectBill = (e) => {
    const data = e.target.value;
    setListBillSelect([...listBillSelect, data]);
  };

  const exportBill = async () => {
    try {
      const response = await billRest.export(listBillSelect);
      const file = new Blob([response], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = new Date() + ".pdf";
      link.click();
    } catch (error) {
      console.error("Error exporting bill:", error);
    }
  };
  const deleteBill = async () => {
    try {
      const data = await billRest.delete(listBillSelect);
      toast(data);
      dispatch(getBills({ limit, page: currentPage - 1 }));
    } catch (error) {
      console.log("🚀 ~ deleteBill ~ error:", error);
    }
  };
  const searchBill = async () => {
    dispatch(getBillsByCus(keyword));
  };

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
      <ToastContainer />
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2">
          <Button
            disabled={listBillSelect.length > 0 ? false : true}
            onClick={() => deleteBill()}
          >
            Xóa hóa đơn
          </Button>
          <Button
            disabled={listBillSelect.length > 0 ? false : true}
            onClick={() => exportBill()}
          >
            Xuất hóa đơn
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search bill by customer"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="items-center" onClick={() => searchBill()}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
      {/* <input type="file" value={file}  />
      <Button /> */}

      <TableCustom col={col}>
        {billSearch.length > 0
          ? billSearch.map((b) => {
              return (
                <tr key={b.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      value={b.id}
                      onChange={(e) => selectBill(e)}
                    />
                  </td>
                  <td className="text-center">{b.id}</td>
                  <td className="text-center">{b.product.title}</td>
                  <td className="text-center">
                    {b.account.firstName + b.account.lastName}
                  </td>
                  <td className="text-center">{b.product.price}</td>
                  <td className="text-center">{b.quantity}</td>
                  <td className="text-center">
                    {b.quantity * b.product.price}
                  </td>
                  <td className="text-center">{b.size}</td>
                  <td className="text-center">{b.color}</td>
                  <td className="text-center">{b.createdAt}</td>
                </tr>
              );
            })
          : bills.map((b) => {
              return (
                <tr key={b.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      value={b.id}
                      onChange={(e) => selectBill(e)}
                    />
                  </td>
                  <td className="text-center">{b.id}</td>
                  <td className="text-center">{b.product.title}</td>
                  <td className="text-center">
                    {b.account.firstName + b.account.lastName}
                  </td>
                  <td className="text-center">{b.product.price}</td>
                  <td className="text-center">{b.quantity}</td>
                  <td className="text-center">
                    {b.quantity * b.product.price}
                  </td>
                  <td className="text-center">{b.size}</td>
                  <td className="text-center">{b.color}</td>
                  <td className="text-center">{b.createdAt}</td>
                </tr>
              );
            })}
      </TableCustom>
      {billSearch.length === 0 ? (
        <div className="text-center mt-4">
          <Pagination
            total={count}
            pageSize={limit}
            current={currentPage}
            onChange={(currentPage) => changePage(currentPage)}
          />
        </div>
      ) : null}
    </div>
  );
}
const col = [
  "MSV",
  "Tên sản phẩm",
  "Người mua",
  "Giá",
  "Số lượng",
  "Tổng",
  "Kích cỡ",
  "Màu sắc",
  "Ngày bán",
];

export default Bill;
