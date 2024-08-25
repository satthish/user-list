// src/pages/edit-user/[id].tsx
import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import UserForm from '@/components/users/UserForm';
import { useRouter } from 'next/router';
import MetaInfo from '@/components/common/MetaInfo';
import MainTitle from '@/components/common/MainTitle';
import { userService } from '@/services/userServices';

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const pageTitle = "Edit User";

  const fetchUser = async () => {
    try {
      const response = await userService.fetchSingleUser(id);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (id) {
      

      fetchUser();
    }
  }, [id]);

  return (
    <Container maxWidth="md">
      <MetaInfo 
        title={pageTitle}
        description='Add users with their complete information'
        keywords='Users, List, Table'
        author='sathish'
      />
      <MainTitle title={pageTitle} />
      <Paper elevation={3} style={{ padding: 20 }}>
      <Button variant="contained" color="primary" className="mb-3" onClick={() => router.push('/')}>
          Back to User List
        </Button>
        {user && <UserForm initialValues={user} type="update" />}
       
      </Paper>
    </Container>
  );
};

export default EditUser;
