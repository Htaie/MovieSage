import { createEvent, createStore } from 'effector';
import { UserDataType } from '../types/UserDataTypes';

export const initialUserStore = JSON.parse(localStorage.getItem('userData')) || null;

// Используйте полученные данные при создании хранилища
export const userDataStore = createStore<UserDataType | any>(initialUserStore);

export const updateUserData = createEvent<UserDataType | any>();

userDataStore.on(updateUserData, (state, userData) => userData);

export const saveUserDataToLocalStorage = (userData: UserDataType | null) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// const clearUserDataFromLocalStorage = () => {
//   localStorage.removeItem('userData');
// };

userDataStore.watch((userData) => {
  saveUserDataToLocalStorage(userData);
});
