import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useAppContext } from "../../context/globalContext";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [allCategory, setAllCategory] = useState();
  const [edit, setEdit] = useState({
    show: false,
    name: "",
    id: "",
  });

  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();

  //* Create category logic
  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(auth);
    try {
      const response = await axios.post(
        "http://localhost:8080/category/create-category",
        { name }
      );
      console.log("Created category", response);
      setName("");
      setNotification({
        show: true,
        message: `[ ${name} ] category created successfully.`,
      });
    } catch (error) {
      console.log("Error creating category", error);
    }
  };

  //*Fetch all category
  useEffect(() => {
    try {
      const fetchAllCategory = async () => {
        const response = await axios.get(
          "http://localhost:8080/category/all-category"
        );
        if (response?.data?.success) {
          setAllCategory(response?.data?.allCategory);
        }
      };
      fetchAllCategory();
    } catch (err) {
      console.log("Error fetching all category", error);
    }
  }, [allCategory]);

  //* Delete Category
  const deleteCategoryHandler = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/category/delete-category/${id}`
    );
  };

  //* Edit Category
  const editCategoryHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8080/category/update-category/${edit.id}`,
        {
          updatedName: edit.name,
        }
      );
      setNotification({
        show: true,
        message: `${edit.name} is the new category name`,
      });
      setEdit({ show: false, name: "", id: "" });
    } catch (error) {
      console.log("error updating category", error);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-center p-3 text-2xl">Create Category</h1>
        {edit?.show && (
          <form
            onSubmit={editCategoryHandler}
            className="flex gap-3 items-center justify-betweem ml-[50%] -translate-x-1/2  text-2xl w-[90%] max-w-[1000px]"
          >
            <label htmlFor="category-name">New category name:</label>
            <input
              type="text"
              name="category-name"
              placeholder="Update name"
              value={edit.name}
              onChange={(e) => {
                setEdit({ ...edit, name: e.target.value });
              }}
              className="flex-1 p-2 outline-none rounded-sm"
            />
            <button
              type="submit"
              className="border border-solid px-4 py-2 bg-orange-900 text-white cursor-pointer rounded-lg"
            >
              Update
            </button>
          </form>
        )}

        {!edit?.show && (
          <form
            onSubmit={submitHandler}
            className="flex gap-3 items-center justify-betweem ml-[50%] -translate-x-1/2  text-2xl w-[90%] max-w-[1000px]"
          >
            <label htmlFor="category">Category Name:</label>
            <input
              type="text"
              name="category"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-2 outline-none rounded-sm"
            />
            <button
              type="submit"
              className="border border-solid rounded-sm px-4 py-2 bg-orange-400 text-white cursor-pointer"
            >
              Create
            </button>
          </form>
        )}
      </div>
      <div className="flex items-center justigy-center gap-2 flex-col py-5 px-2">
        <h1 className="text-center text-2xl font-medium p-3">
          All category list
        </h1>
        {allCategory?.map((item, index) => {
          return (
            <div
              key={item?._id}
              className="flex gap-5  items-center p-2 max-w-[900px] w-[70%] bg-white rounded-md"
            >
              <p className="self-start flex-1 p-2 font-medium text-2xl">
                {item?.name}
              </p>
              {edit.show && edit.id === item?._id ? (
                <button
                  onClick={() => setEdit({ name: "", show: false, id: "" })}
                  className="p-2 cursor-pointer bg-green-700 text-white rounded-md"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() =>
                    setEdit({ name: item?.name, show: true, id: item?._id })
                  }
                  className="p-2 cursor-pointer bg-orange-700 text-white rounded-md"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCategoryHandler(item?._id)}
                className="p-2 cursor-pointer bg-orange-900 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CreateCategory;
