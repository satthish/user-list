/**
 * Add User Page
 */
import React from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import UserForm from '@/components/users/UserForm';
import MetaInfo from '@/components/common/MetaInfo';
import MainTitle from '@/components/common/MainTitle';
import { useRouter } from 'next/router';

const AddUser = () => {
  const router = useRouter();
  const pageTitle = "Add New User";

  return (
    <>
     <MetaInfo 
        title={pageTitle}
        description='Add users with their complete information'
        keywords='Users, List, Table'
        author='sathish'
      />
      <MainTitle title={pageTitle} />
    
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Button variant="contained" className='mb-2' color="primary" onClick={() => router.push('/')}>
          Back to User List
        </Button>
        <UserForm type="add" />
      </Paper>
    </Container>
    </>
  );
};

export default AddUser;
