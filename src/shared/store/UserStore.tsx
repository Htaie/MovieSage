import { createEvent, createStore } from 'effector';

export const initialUserStore = JSON.parse(localStorage.getItem('userData')) || null;

// Используйте полученные данные при создании хранилища
export const userAuthDataStore = createStore<null | any>(initialUserStore);

export const updateUserAuthData = createEvent<null | any>(null);

userAuthDataStore.on(updateUserAuthData, (state, userData) => userData);

export const saveUserDataToLocalStorage = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// const clearUserDataFromLocalStorage = () => {
//   localStorage.removeItem('userData');
// };

userAuthDataStore.watch((userData) => {
  saveUserDataToLocalStorage(userData);
});
