import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/users/interface";
import { getUsers, setUsers } from "../../services/users";
import dayjs from "dayjs";

const initialState: User[] = getUsers();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    create: (state, action) => {
      const new_user = { ...action.payload, id: dayjs().valueOf().toString() };
      const new_state = [...state, new_user];
      setUsers(new_state);
      return new_state;
    },
    update: (state, action) => {
      const new_state = state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      setUsers(new_state);
      return new_state;
    },
    delete: (state, action) => {
      const new_state = state.filter((item) => item.id !== action.payload);
      setUsers(new_state);
      return new_state;
    },
    multipleDelete: (state, action) => {
      const new_state = state.filter(
        (item) => !action.payload.includes(item.id)
      );
      setUsers(new_state);
      return new_state;
    },
  },
});

export default usersSlice.reducer;
