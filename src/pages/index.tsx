/**
 * Users List Page
 * 
 * All the components which was created seperatly for this particular page will be include here
 * Api is fetched to load the data for users and listed here.
 * Links added to seperately add and edit the particular user.
 * Used a common table instead of data table
 */
import React, { useEffect } from 'react';
import MetaInfo from '@/components/common/MetaInfo';
import MainTitle from '@/components/common/MainTitle';
import UserList from '@/components/users/UserList';
import { useUserContext } from '@/context/UsersContext';
import { userService } from '@/services/userServices';

const Home = () => {
  const pageTitle = "User List";
  const { loadUserList } = useUserContext();

  const getUserList = async () => {
    const response = await userService.fetchUser();
    loadUserList(response);
  }
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <MetaInfo 
        title={pageTitle}
        description='Displays list of users with their complete information'
        keywords='Users, List, Table'
        author='sathish'
      />
      <MainTitle title={pageTitle} />
      <UserList />
    </>
  );
}

export default Home;
