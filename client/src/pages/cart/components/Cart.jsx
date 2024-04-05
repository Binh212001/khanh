import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillByUserId } from "../../../redux/billAction";
import { useNavigate } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!user?.data?.userId) {
    navigate("/auth");
  }
  useEffect(() => {
    dispatch(
      getBillByUserId({
        userId: user?.data?.userId,
      })
    );
  }, [user, dispatch]);
  const { bills } = useSelector((state) => state.bill);
  return (
    <div className="flex justify-center">
      <div>
        <div className="container mx-auto p-4 grid grid-cols-4 gap-5">
          {bills.map((item) => (
            <div className="bg-white shadow-md rounded-md p-6">
              <h1 className="text-2xl font-bold mb-4 dot">
                {item.product.title}
              </h1>
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
