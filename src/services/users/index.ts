import { User } from "./interface";

export const setUsers = (value: User[]) => {
  return localStorage.setItem("users", JSON.stringify(value));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const getUser = (id: string) => {
  return JSON.parse(localStorage.getItem("users") || "[]").find(
    (e: User) => e.id === id
  );
};
