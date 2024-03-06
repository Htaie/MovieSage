import { createEvent, createStore } from 'effector';

export const initialUserStore = JSON.parse(localStorage.getItem('userData')) || null;

// Используйте полученные данные при создании хранилища
export const userDataStore = createStore<null | any>(initialUserStore);

export const updateUserData = createEvent<null | any>();

userDataStore.on(updateUserData, (state, userData) => userData);

export const saveUserDataToLocalStorage = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// const clearUserDataFromLocalStorage = () => {
//   localStorage.removeItem('userData');
// };

userDataStore.watch((userData) => {
  saveUserDataToLocalStorage(userData);
});
