import { DeleteTwoTone } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import billRest from "../../../api/BillRest";
import { getBillByUserId } from "../../../redux/billAction";
function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  if (!user?.userId) {
    navigate("/auth");
  }
  useEffect(() => {
    dispatch(
      getBillByUserId({
        userId: user?.userId,
      })
    );
  }, [user, dispatch]);

  const deleteBill = async (id) => {
    try {
      await billRest.delete([id]);
      toast("Xóa hóa đơn thành công");
      dispatch(
        getBillByUserId({
          userId: user?.userId,
        })
      );
      handleCancel();
    } catch (error) {
      console.log("🚀 ~ deleteBill ~ error:", error);
    }
  };
  const { bills } = useSelector((state) => state.bill);

  return (
    <div className="flex justify-center" style={{ minHeight: "50vh" }}>
      <ToastContainer />
      <div>
        <div className="container mx-auto p-4 grid grid-cols-4 gap-5">
          {bills.map((item) => (
            <div className="bg-white shadow-md rounded-md p-6 relative">
              <Modal
                title="Xác nhận xóa đơn hàng."
                open={isModalOpen}
                onOk={() => deleteBill(item?.id)}
                onCancel={handleCancel}
                visible={isModalOpen}
              >
                <p>Bạn có muốn xóa những đơn hàng này không.</p>
              </Modal>
              <div>
                <span onClick={showModal} className="absolute right-4 top-4">
                  <DeleteTwoTone />
                </span>
                <h1 className="text-2xl font-bold mb-4 dot">
                  {item.product.title}
                </h1>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-bold">Số lượng:</p>
                <p>{item?.quantity}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-bold">Giá:</p>
                <p>{item?.product?.price}</p>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-bold">Ngày:</p>
                  <p>{item.createdAt}</p>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-bold">SDT:</p>
                  <p>{item?.account?.phone}</p>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-bold">Đại chỉ:</p>
                  <p>{item?.account?.addressDetail}</p>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-bold">Tổng:</p>
                <p>{item?.product?.price * item?.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
