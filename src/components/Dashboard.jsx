import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { fetchUsers } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Example list of countries
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "India",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filters
  const [countryFilter, setCountryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userState.users.length > 0) {
      setFilteredUsers(userState.users);
    }
  }, [userState.users]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleFilter = () => {
    let users = userState.users;

    if (countryFilter) {
      users = users.filter(
        (user) =>
          user.address &&
          user.address.country &&
          user.address.country.toLowerCase() === countryFilter.toLowerCase()
      );
    }

    if (genderFilter) {
      users = users.filter(
        (user) =>
          user.gender &&
          user.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    setFilteredUsers(users);
  };

  const handleReset = () => {
    setCountryFilter("");
    setGenderFilter("");
    setFilteredUsers(userState.users);
  };

  return (
    <div className=" mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {authState.user?.name?.firstname}{" "}
            {authState.user?.name?.lastname}
          </h1>
          <p className="text-lg text-gray-600">
            Email: {authState.user?.email}
          </p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-end">
          <div className="flex gap-4 items-center">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <option value="">All</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={handleFilter}
            >
              Apply Filters
            </button>
            <button
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition duration-300"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {userState.loading ? (
          <p className="text-center p-6">Loading users...</p>
        ) : userState.error ? (
          <p className="text-center text-red-500 p-6">{userState.error}</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Username
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const username =
                  `${user.name?.firstname}_${user.name?.lastname}`.toLowerCase();
                const address = `${user.address?.address || ""}`.trim();

                return (
                  <tr key={user.id} className="border-t">
                    <td className="py-3 px-4">
                      {user.name?.firstname} {user.name?.lastname}
                    </td>
                    <td className="py-3 px-4">{username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
