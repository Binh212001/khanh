import { Button, Modal } from "antd";
import { useState } from "react";
import { BASEURL } from "../../../api/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import billRest from "../../../api/BillRest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [buy, setBuy] = useState([]);
  let [sum, setSum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

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

  const buyProduct = async () => {
    if (user === null) {
      toast("Vui lòng đăng nhập ");
      setIsModalOpen(false);
      return;
    }
    const billId = Math.floor(Math.random() * 999999);
    try {
      const bill = {
        billId,
        userId: cart[0].account.userId,
        fullName: cart[0].account.firstName + cart[0].account.lastName,
        address: cart[0].account.addressDetail,
        phone: cart[0].account.phone,
        sum,
      };
      await billRest.createBill(bill);
      const dataBuy = [];
      buy.forEach((data) => {
        dataBuy.push({
          name: data.product.title,
          price: data.product.price,
          quantity: data.quantity,
          image: data.product.image,
          size: data.size,
          color: data.color,
          billId,
          productId: data.product.pid,
        });
      });
      await billRest.createBuy(dataBuy);
      toast("Mua hàng thành công.");
      setIsModalOpen(false);
      setBuy([]);
      setSum(0);
    } catch (error) {
      toast("Mua Hàng thất bại.");
    }
  };

  const navigate = useNavigate();

  const redirectBill = () => {
    if (user === null) {
      toast("Vui lòng cần đăng nhập ");
    } else {
      navigate("/myBill");
    }
  };

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
        <div>{sum === 0 ? "" : sum}</div>
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
      <div className="flex items-center mb-7">
        <Button onClick={redirectBill}>Hóa đơn của tôi</Button>
      </div>
    </div>
  );
}

export default Cart;
