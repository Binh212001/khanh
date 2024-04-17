import { Button, Modal } from "antd";
import { useState } from "react";
import { BASEURL } from "../../../api/BaseApi";
import { ToastContainer, toast } from "react-toastify";
// import { DeleteTwoTone } from "@ant-design/icons";
// import { Modal } from "antd";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import billRest from "../../../api/BillRest";
// import { getBillByUserId } from "../../../redux/billAction";
// function Cart() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const navigate = useNavigate();
//   if (!user?.userId) {
//     navigate("/auth");
//   }
//   useEffect(() => {
//     dispatch(
//       getBillByUserId({
//         userId: user?.userId,
//       })
//     );
//   }, [user, dispatch]);

//   const deleteBill = async (id) => {
//     try {
//       await billRest.delete([id]);
//       toast("Xóa hóa đơn thành công");
//       dispatch(
//         getBillByUserId({
//           userId: user?.userId,
//         })
//       );
//       handleCancel();
//     } catch (error) {
//       console.log("🚀 ~ deleteBill ~ error:", error);
//     }
//   };
//   const { bills } = useSelector((state) => state.bill);

//   return (
//     <div className="flex justify-center" style={{ minHeight: "50vh" }}>
//       <ToastContainer />
//       <div>
//         <div className="container mx-auto p-4 grid grid-cols-4 gap-5">
//           {bills.map((item) => (
//             <div className="bg-white shadow-md rounded-md p-6 relative">
//               <Modal
//                 title="Xác nhận xóa đơn hàng."
//                 open={isModalOpen}
//                 onOk={() => deleteBill(item?.id)}
//                 onCancel={handleCancel}
//                 visible={isModalOpen}
//               >
//                 <p>Bạn có muốn huy đơn hàng này không.</p>
//               </Modal>
//               <div>
//                 <span onClick={showModal} className="absolute right-4 top-4">
//                   <DeleteTwoTone />
//                 </span>
//                 <h1 className="text-2xl font-bold mb-4 dot">
//                   {item.product.title}
//                 </h1>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <p className="font-bold">Số lượng:</p>
//                 <p>{item?.quantity}</p>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <p className="font-bold">Giá:</p>
//                 <p>{item?.product?.price}</p>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div>
//                   <p className="font-bold">Ngày:</p>
//                   <p>{item.createdAt}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div>
//                   <p className="font-bold">SDT:</p>
//                   <p>{item?.account?.phone}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div>
//                   <p className="font-bold">Đại chỉ:</p>
//                   <p>{item?.account?.addressDetail}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <p className="font-bold">Tổng:</p>
//                 <p>{item?.product?.price * item?.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

function Cart() {
  const [buy, setBuy] = useState([]);
  let [sum, setSum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getCartfromLocalStorage() {
    const value = localStorage.getItem("cart");
    if (value === null || value === undefined) {
      return [];
    }
    return JSON.parse(value);
  }

  const [cart, setCart] = useState(getCartfromLocalStorage());
  function deleteCart(id) {
    const cartFilter = cart.filter((c) => c.cartId != id);
    setCart(cartFilter);
    localStorage.setItem("cart", JSON.stringify(cartFilter));
  }

  const handelBuy = (e) => {
    if (e.target.checked) {
      const dataCheck = cart.filter((c) => c.cartId == e.target.value);
      setBuy((prev) => [...prev, dataCheck[0]]);
      setSum((sum += dataCheck[0].product.price + dataCheck[0].quantity));
    } else {
      const dataUnCheck = cart.filter((c) => c.cartId == e.target.value);
      setBuy((prev) => prev.filter((c) => c.cartId != e.target.value));
      setSum((sum -= dataUnCheck[0].product.price * dataUnCheck[0].quantity));
    }
  };

  const showModal = () => {
    if (buy.length > 0) {
      setIsModalOpen(true);
      return;
    }
    toast("Bạn cần chọn sản phẩm để mua");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const buyProduct = () => {};
  return (
    <div
      className="container mx-auto px-4 grid grid-cols-4 gap-4 "
      style={{ minHeight: "50vh" }}
    >
      <div className="col-span-3  p-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2"> </th>
              <th className="border px-4 py-2">Tên sản phẩm</th>
              <th className="border px-4 py-2">Ảnh</th>
              <th className="border px-4 py-2">Giá</th>
              <th className="border px-4 py-2">Màu sắc</th>
              <th className="border px-4 py-2">Kích cỡ </th>
              <th className="border px-4 py-2">Số lượng </th>
              <th className="border px-4 py-2">Xoa</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      name="cartCheck"
                      type="checkbox"
                      value={data?.cartId}
                      onChange={(e) => handelBuy(e)}
                    />
                  </td>
                  <td className="border px-4 py-2">{data?.product?.title}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={`${BASEURL}image/${data?.product?.image}`}
                      alt={data?.product?.title}
                      style={{ width: "50px" }}
                      className="block h-auto"
                    />
                  </td>
                  <td className="border px-4 py-2">{data?.product?.price}</td>
                  <td className="border px-4 py-2">{data?.color}</td>
                  <td className="border px-4 py-2">{data?.size}</td>
                  <td className="border px-4 py-2">{data?.quantity}</td>
                  <td className="border px-4 py-2">
                    <Button onClick={() => deleteCart(data.cartId)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-span-1   bg-gray-300 p-4">
        <h2>Hóa đơn</h2>
        {buy.map((data, index) => {
          return (
            <div key={data?.cartId}>
              <h5>Sản Phẩm : {data?.product?.title}</h5>
              <h5>
                Giá : {data?.product?.price} x {data?.quantity}
              </h5>
            </div>
          );
        })}
        <div>{sum}</div>
        <div className="grid">
          <Button type="primary" className="block" onClick={showModal}>
            Mua Hàng
          </Button>
        </div>
      </div>
      <Modal
        title="Xác nhận mua hàng."
        open={isModalOpen}
        onOk={() => buyProduct()}
        onCancel={handleCancel}
        visible={isModalOpen}
      >
        <p>Bạn có muốn mua đơn hàng này không.</p>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Cart;
