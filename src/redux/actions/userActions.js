// src/redux/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        // Fetch users from FakeStore API
        const response = await axios.get('https://fakestoreapi.com/users');
        const apiUsers = response.data;
  
        // Get users from localStorage
        const localUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
        // Combine both sets of users
        const allUsers = [...apiUsers, ...localUsers];
  
        return allUsers;
      } catch (error) {
        return rejectWithValue('Failed to fetch users');
      }
    }
  );
  
  
