import React, { useEffect, useState } from "react";
import api from "../../Services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // ✅ fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ change role (user <-> admin)
  const changeRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      await api.patch(`/users/${user.id}`, { role: newRole });

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.log("Error changing role:", err);
      alert("Failed to change role");
    }
  };

  // ✅ block/unblock (adds/updates `isBlocked` in db.json)
  const toggleBlock = async (user) => {
    const newBlocked = !(user.isBlocked ?? false);

    try {
      await api.patch(`/users/${user.id}`, { isBlocked: newBlocked });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isBlocked: newBlocked } : u
        )
      );
    } catch (err) {
      console.log("Error blocking/unblocking:", err);
      alert("Failed to update user status");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-black">
          Users <span className="text-yellow-500">({users.length})</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage users • Switch role • Block/Unblock
        </p>
      </div>

      {/* Empty */}
      {users.length === 0 ? (
        <div className="bg-white border border-yellow-200 rounded-2xl shadow p-10 text-center">
          <p className="text-gray-600 font-semibold">No users found.</p>
        </div>
      ) : (
        <div className="bg-white border border-yellow-200 rounded-2xl shadow overflow-hidden">
          {/* Table head */}
          <div className="grid grid-cols-12 bg-black text-yellow-400 px-4 py-3 text-sm font-semibold">
            <div className="col-span-3">Name</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          {users.map((user) => {
            const blocked = user.isBlocked ?? false;

            return (
              <div
                key={user.id}
                className={`grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0
                            transition ${
                              blocked ? "bg-red-50/40" : "hover:bg-yellow-50/40"
                            }`}
              >
                {/* Name */}
                <div className="col-span-3">
                  <p className="font-semibold text-black line-clamp-1">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: <span className="font-semibold">{user.id}</span>
                  </p>
                </div>
        
                {/* Email */}
                <div className="col-span-4">
                  <p className="text-sm text-gray-700">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    Orders:{" "}
                    <span className="font-semibold">
                      {user.orders ? user.orders.length : 0}
                    </span>
                  </p>
                </div>

                {/* Phone */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">{user.phone || "-"}</p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-bold border ${
                      blocked
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-green-100 text-green-700 border-green-200"
                    }`}
                  >
                    {blocked ? "BLOCKED" : "ACTIVE"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end items-center gap-2">
                  {/* Role pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      user.role === "admin"
                        ? "bg-black text-yellow-400 border-black"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {(user.role || "user").toUpperCase()}
                  </span>

                  {/* Switch role */}
                  <button
                    onClick={() => changeRole(user)}
                    className="text-xs px-3 py-1 rounded border border-yellow-400
                               text-yellow-600 hover:bg-yellow-400 hover:text-black transition"
                    title="Switch role"
                  >
                    Switch
                  </button>

                  {/* Block/Unblock */}
                  <button
                    onClick={() => toggleBlock(user)}
                    className={`text-xs px-3 py-1 rounded border transition ${
                      blocked
                        ? "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                        : "border-red-400 text-red-600 hover:bg-red-500 hover:text-white"
                    }`}
                    title={blocked ? "Unblock user" : "Block user"}
                  >
                    {blocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      
    </div>
  );
};

export default AdminUsers;