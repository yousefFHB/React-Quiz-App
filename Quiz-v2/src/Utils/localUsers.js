const STORAGE_KEY = "LOCAL_USERS";

const getUsers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const addLocalUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const findLocalUser = (identifier, password) => {
  const users = getUsers();
  return users.find(
    (user) =>
      (user.username === identifier || user.email === identifier) &&
      user.password === password
  );
};
export const localUsers = getUsers();