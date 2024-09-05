import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";

// Helper to generate a simple token
const generateSimpleToken = () => {
  return `token_${new Date().getTime()}`;
};

// Helper to verify token (checks if it exists in localStorage)
const verifySimpleToken = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists
};

// Login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Fetch users from FakeStore API
      const response = await axios.get("https://fakestoreapi.com/users");
      const apiUsers = response.data;

      // Get locally registered users from localStorage
      const localUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Combine API and localStorage users
      const allUsers = [...apiUsers, ...localUsers];

      // Find user with matching email
      const user = allUsers.find((user) => user.email === email);

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return rejectWithValue("Invalid email or password");
      }

      // Generate token and store it in localStorage
      const token = generateSimpleToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Login successful
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

// Helper to generate a random username
const generateRandomUsername = () => {
  return `user${Math.floor(Math.random() * 10000)}`;
};

// Register action
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Prepare user data with hashed password
      const newUser = {
        email: userData.email,
        username: generateRandomUsername(),
        password: hashedPassword,
        name: {
          firstname: userData.firstName,
          lastname: userData.lastName,
        },
        address: {address : userData.address},
        country: userData.country,
        gender: userData.gender,
        phone: userData.phone,
      };

      // Fetch existing users from API
      const response = await axios.get("https://fakestoreapi.com/users");
      const apiUsers = response.data;

      // Get registered users from localStorage
      const localUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Combine both sets of users
      const allUsers = [...apiUsers, ...localUsers];

      // Check if user with the same email already exists
      const userExists = allUsers.some((user) => user.email === userData.email);

      if (userExists) {
        return rejectWithValue("User with this email already exists.");
      }

      // Register the user by making a POST request to FakeStore API
      const postResponse = await axios.post(
        "https://fakestoreapi.com/users",
        newUser
      );

      if (postResponse.data.id) {
        // Save the user in localStorage
        const updatedUsers = [...localUsers, newUser];
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
        return newUser;
      } else {
        throw new Error("Registration failed. User data was not stored.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Logout action
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  // Clear user session from localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
});
