import React, { useState, useEffect } from "react";
import "./category.css";
import AdminLayout from "../../admin_layout/adminLayout";
import axios from "axios";
function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/v1/category/all`
        );
        console.log(response.data.listCategories);
        if (response.data.status === 200) {
          setCategories(response.data.listCategories); // Assuming response.data contains the categories
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories(); // Call the function to fetch data
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setCategoryName("");
    setIsEditing(false);
    setEditCategoryName("");
    setEditCategoryId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      // Xử lý lưu thông tin danh mục khi chỉnh sửa
      console.log("Updated Category:", editCategoryId, editCategoryName);
    } else {
      // Xử lý thêm danh mục mới
      console.log("Category Name:", categoryName);
    }
    handleReset();
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditCategoryName(category.name);
    setEditCategoryId(category.id);
  };

  return (
    <AdminLayout>
      {!isEditing ? (
        <div className="create-category-container">
          <h1 className="create-category-title">Tạo danh mục mới</h1>
          <form className="create-category-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Tên danh mục mới</label>
              <input
                type="text"
                id="categoryName"
                placeholder="Danh mục"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="submit-button">
                Tạo danh mục mới
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-category-container">
          <h1 className="create-category-title">Sửa danh mục</h1>
          <form className="create-category-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="editCategoryName">Tên danh mục</label>
              <input
                type="text"
                id="editCategoryName"
                placeholder="Category"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Huỷ bỏ
              </button>
              <button type="submit" className="submit-button">
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="category-table-container">
        <div className="category-table-header">
          <h1 className="category-table-title">Toàn bộ danh mục</h1>
          <div className="category-search">
            <input
              type="text"
              placeholder="Tìm danh mục bằng tên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Tìm kiếm</button>
          </div>
        </div>
        <table className="category-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(category)}
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button className="delete-button">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Category;
