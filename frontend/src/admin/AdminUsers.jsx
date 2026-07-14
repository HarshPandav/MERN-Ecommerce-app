import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/auth/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      setUsers(Array.isArray(data) ? data : []);
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">

      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FlyCart Admin
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          User Directory
        </h1>

        <p className="mt-3 text-slate-500">
          View all registered users and their account information.
        </p>
      </div>

      <div className="mb-6">
        <span className="inline-flex rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          Total Users: {users.length}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="transition hover:bg-blue-50/50"
                >

                  <td className="whitespace-nowrap px-6 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 font-mono text-sm text-slate-600">
                      {user._id.substring(0, 8)}...
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold uppercase text-blue-600">
                        {user.name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-900">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        user.role === "admin"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {users.length === 0 && (
          <div className="px-5 py-16 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No users found
            </h3>

            <p className="mt-2 text-slate-500">
              There are currently no registered FlyCart users.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;