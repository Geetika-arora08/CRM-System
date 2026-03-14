import { useEffect, useState } from "react";
import api from "../../api";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      const usersArray = res.data.data;
      setUsers(usersArray);
      setFiltered(usersArray);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter
  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    );
  }, [query, users]);

  // Edit user
  const handleEdit = (user) => {
    setEditUser({ ...user });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    try {
      await api.put(`/admin/users/${editUser._id}`, editUser);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update route not created yet");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch {
      alert("Delete route not created yet");
    }
  };

  if (loading) return <div className="text-xl font-semibold">Loading users...</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Users</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow w-full max-w-md">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search name or email..."
          className="outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="text-gray-500 mt-6">No users found</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role?.toLowerCase() === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <div className="mb-3">
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold">Role</label>
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-slate-800 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;