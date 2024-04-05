import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productRest from "../../api/ProductRest";
import { ToastContainer, toast } from "react-toastify";
import uploadFile from "../../api/UploadFile";

function ProductForm({ mode, product, closeForm }) {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (product) {
      try {
        const fileExtension = data?.image[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (
          !["jpg", "png", "jpeg", "gif", "webp", "tiff"].includes(fileExtension)
        ) {
          toast("Định dạng file phải  là png, jpg, jpeg, gif, webp, tiff");
        } else {
          await productRest.update({ ...data, id: product.pid });
          const formData = new FormData();
          formData.append("file", data.image[0]);
          formData.append("productId", product.pid);
          await uploadFile.uploadProduct(formData);
          toast("Cập nhật  sản phẩm thành công");
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    } else {
      const id = Math.floor(Math.random() * 10000);
      try {
        const fileExtension = data?.image[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (
          !["jpg", "png", "jpeg", "gif", "webp", "tiff"].includes(fileExtension)
        ) {
          toast("Định dạng file phải  là png, jpg, jpeg, gif, webp, tiff");
        } else {
          await productRest.create({ ...data, id, sellerId: user.data.userId });
          const formData = new FormData();
          formData.append("file", data.image[0]);
          formData.append("productId", id);
          await uploadFile.uploadProduct(formData);
          setTimeout(() => {
            toast("Thêm sản phẩm thành công");
          }, 300);
          reset();
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    }
  };
  return (
    <div className=" mx-auto bg-white p-8 rounded-md shadow-md  mb-5">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">
        {mode ? "Thêm sản phẩm" : "Cập nhập sản phẩm"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={product ? product.title : ""}
            {...register("title", {
              required: "Tên sản phẩm phải dài hon 20 ký tự",
              min: 20,
            })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-xl font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            defaultValue={product ? product.price : ""}
            {...register("price", {
              required: "Giá  phải là số.",
              pattern: "/^d+$/",
            })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            defaultValue={product ? product.description : ""}
            {...register("description", { required: "Mô tả là bắt buộc." })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          ></textarea>
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div></div>
        <div>
          <label
            htmlFor="size"
            className="block text-xl font-medium text-gray-700"
          >
            Size
          </label>
          <input
            type="checkbox"
            className="shadow-md"
            value="1"
            {...register("size")}
          ></input>{" "}
          SM
          <input
            type="checkbox"
            className="shadow-md"
            value="2"
            {...register("size")}
          ></input>{" "}
          MD
          <input
            type="checkbox"
            className="shadow-md"
            value="3"
            {...register("size")}
          ></input>{" "}
          LG
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-xl font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="checkbox"
            className="shadow-md"
            value="1"
            {...register("color")}
          ></input>{" "}
          RED
          <input
            type="checkbox"
            className="shadow-md"
            value="2"
            {...register("color")}
          ></input>{" "}
          WHITE
          <input
            type="checkbox"
            className="shadow-md"
            value="3"
            {...register("color")}
          ></input>{" "}
          BLUE
        </div>

        <div>
          <label
            htmlFor="  "
            className="block text-xl font-medium text-gray-700"
          >
            Category
          </label>
          <select
            className="shadow-md"
            select="1"
            {...register("category")}
            id="category"
          >
            <option value="quan">Quần</option>
            <option value="ao">Áo</option>
            <option value="vay">Váy</option>
            <option value="giaydep">Giày dép</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-xl font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image", { required: "Ảnh là bắt buộc." })}
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          ></input>
          {errors.image && <span>{errors.image.message}</span>}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
