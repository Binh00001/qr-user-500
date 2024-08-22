import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableManagement.css";
import AdminLayout from "../../admin_layout/adminLayout";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
function TableManagement() {
  const [tableName, setTableName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTableName, setEditTableName] = useState("");
  const [editTableId, setEditTableId] = useState(null);
  const [viewUuid, setViewUuid] = useState(null);
  const [tables, setTables] = useState([]);
  const [reload, setReload] = useState(false);
  const authHeader = useAuthHeader();

  const config = {
    headers: { Authorization: authHeader },
  };

  useEffect(() => {
    const fetchTables = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/v1/table/all`, config)
        .then((response) => {
          const data = response.data;
          if (data && data.status === 200) {
            setTables(data.listTable);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchTables();
  }, [reload]);

  const filteredTables = tables.filter(
    (table) =>
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.uuid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setTableName("");
    setIsEditing(false);
    setEditTableName("");
    setEditTableId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      // Xử lý lưu thông tin bàn khi chỉnh sửa
      const url = `${process.env.REACT_APP_API_URL}/v1/table/${editTableId}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      };
      const data = { name: editTableName };

      axios
        .put(url, data, config)
        .then((response) => {
          if (response.status === 200) {
            alert(`Tên bàn được đổi thành ${editTableName}`);
            setReload(!reload);
          } else {
            alert("Xảy ra lỗi khi đổi tên bàn");
          }
          // Optionally refresh list or show success message
        })
        .catch((error) => {
          alert("Xảy ra lỗi khi đổi tên bàn");
          console.error("Error updating table:", error);
          // Optionally show error message
        });
    } else {
      // Xử lý thêm bàn mới
      const url = `${process.env.REACT_APP_API_URL}/v1/table`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      };
      const data = { name: tableName, status: "active" };

      axios
        .post(url, data, config)
        .then((response) => {
          if (response.status === 200) {
            alert(`Tạo bàn ${tableName} thành công!`);
            setReload(!reload);
          } else {
            alert("Xảy ra lỗi khi tạo bàn! Có thể bàn đã tồn tại");
          }

          // Optionally refresh list or show success message
        })
        .catch((error) => {
          alert("Xảy ra lỗi khi tạo bàn! Có thể bàn đã tồn tại");
          // Optionally show error message
        });
    }
    handleReset();
  };

  const handleEdit = (table) => {
    setIsEditing(true);
    setEditTableName(table.name);
    setEditTableId(table.id);
  };

  const handleDelete = (table) => {
    console.log(table.id);
  };

  const handleCopyUuid = (uuid) => {
    navigator.clipboard.writeText(uuid);
    alert(`Copied UUID: ${uuid}`);
  };

  const handleToggleActive = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, active: !table.active } : table
      )
    );
    console.log("Toggled active state for Table ID:", id);
  };

  const handleViewUuid = (id) => {
    setViewUuid(id === viewUuid ? null : id);
  };

  return (
    <AdminLayout>
      {!isEditing ? (
        <div className="create-table-container">
          <h1 className="create-table-title">Tạo bàn mới</h1>
          <form className="create-table-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tableName">Tên bàn mới</label>
              <input
                type="text"
                id="tableName"
                placeholder="Table Name"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
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
                Xác Nhận
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-table-container">
          <h1 className="create-table-title">Sửa tên bàn</h1>
          <form className="create-table-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="editTableName">Tên bàn</label>
              <input
                type="text"
                id="editTableName"
                placeholder="Table Name"
                value={editTableName}
                onChange={(e) => setEditTableName(e.target.value)}
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
      <div className="table-management-container">
        <div className="table-management-header">
          <h1 className="table-management-title">Toàn bộ bàn</h1>
          <div className="table-search">
            <input
              type="text"
              placeholder="Tìm bàn bằng tên hoặc UUID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Tìm kiếm</button>
          </div>
        </div>
        <table className="table-management">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên bàn</th>
              <th>UUID</th>
              <th>Trạng thái</th>
              <th>Sửa tên</th>
              <th>Xoá bàn</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table, index) => (
              <tr key={table.id}>
                <td>{index + 1}</td>
                <td>{table.name}</td>
                <td>
                  {viewUuid === table.id ? (
                    <>
                      {table.uuid}
                      <button
                        className="view-button"
                        onClick={() => handleViewUuid(table.id)}
                      >
                        Ẩn bớt
                      </button>
                      <button
                        className="copy-button"
                        onClick={() => handleCopyUuid(table.uuid)}
                      >
                        📋
                      </button>
                    </>
                  ) : (
                    <>
                      {table.uuid.slice(0, 8)}...
                      <button
                        className="view-button"
                        onClick={() => handleViewUuid(table.id)}
                      >
                        Xem
                      </button>
                      <button
                        className="copy-button"
                        onClick={() => handleCopyUuid(table.uuid)}
                      >
                        📋
                      </button>
                    </>
                  )}
                </td>

                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={!table.active}
                      onChange={() => handleToggleActive(table.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(table)}
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(table)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default TableManagement;
