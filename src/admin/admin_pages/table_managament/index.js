import React, { useState } from "react";
import "./TableManagement.css";
import AdminLayout from "../../admin_layout/adminLayout";

function TableManagement() {
  const [tableName, setTableName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTableName, setEditTableName] = useState("");
  const [editTableId, setEditTableId] = useState(null);
  const [viewUuid, setViewUuid] = useState(null);

  const [tables, setTables] = useState([
    {
      id: 1,
      name: "Table 1",
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      active: true,
    },
    {
      id: 2,
      name: "Table 2",
      uuid: "123e4567-e89b-12d3-a456-426614174001",
      active: false,
    },
    {
      id: 3,
      name: "Table 3",
      uuid: "123e4567-e89b-12d3-a456-426614174002",
      active: true,
    },
    {
      id: 4,
      name: "Table 4",
      uuid: "123e4567-e89b-12d3-a456-426614174003",
      active: false,
    },
  ]);

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
      console.log("Updated Table:", editTableId, editTableName);
    } else {
      // Xử lý thêm bàn mới
      console.log("Table Name:", tableName);
    }
    handleReset();
  };

  const handleEdit = (table) => {
    setIsEditing(true);
    setEditTableName(table.name);
    setEditTableId(table.id);
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
              <th>Sửa</th>
              <th>Delete</th>
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
                      checked={table.active}
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

export default TableManagement;
