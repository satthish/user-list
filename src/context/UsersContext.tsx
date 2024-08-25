import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types/User';

interface UserContextType {
  userList: User[];
  deleteUser: (id: number) => void;
  loadUserList: (data: User[]) => void;
  addUser: (userData: User) => void;
  updateUser: (userData: User) => void;  // Add the updateUser function here
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userList, setUserList] = useState<User[]>([]);

  // Add a user to the list
  const addUser = (userDetails: User) => {
    let tempData = userDetails;
    tempData.id = userList.length;
    setUserList([...userList, tempData]);
  };

  // Delete the user from the list using id
  const deleteUser = (id: number) => {
    setUserList(prev => prev.filter(user => user.id !== id));
  };

  // Set user list array
  const loadUserList = (data: User[]) => {
    if (data.length > 0) {
      setUserList(data);
      return true;
    }
  };

  // Update an existing user in the list
  const updateUser = (updatedUser: User) => {
    setUserList(prev => prev.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    return true;
  };

  const value = {
    userList,
    deleteUser,
    loadUserList,
    addUser,
    updateUser  // Provide the updateUser function
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
