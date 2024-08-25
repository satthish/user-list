import React, { useEffect, useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TableSortLabel, 
    Paper, 
    Button,
    Container,
    TextField,
    IconButton,
    Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/types/User';
import { useRouter } from 'next/router';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { useUserContext } from '@/context/UsersContext';

const UserList = () => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [filterText, setFilterText] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const router = useRouter();
  const { userList, deleteUser } = useUserContext();

  const handleRowClick = (id: number) => {
    setExpandedRowId(prev => (prev === id ? null : id));
  };

  const handleSort = (property: keyof User) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value.toLowerCase());
  };

  const filteredAndSortedUserList = [...userList]
    .filter(user =>
      user.name.toLowerCase().includes(filterText) ||
      user.email.toLowerCase().includes(filterText) ||
      user.linkedinURL?.toLowerCase().includes(filterText) ||
      user.gender.toLowerCase().includes(filterText)
    )
    .sort((a, b) => {
      const aValue = a[sortBy] ?? '';
      const bValue = b[sortBy] ?? ''; 
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const handleDeleteClick = (id: number, name: string) => {
      setSelectedUserId(id);
      setSelectedUserName(name);
      setOpenDialog(true);
    };
  
    const handleConfirmDelete = () => {
      if(selectedUserId != null){
        deleteUser(selectedUserId);
      }   
    };
    
  return (
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={4}>
        <TextField
          label="Filter"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleFilterChange}
          value={filterText}
          size='small'
        />
        </Grid>
        <Grid item xs={2} className='my-auto'>
          <Button 
            variant="contained" 
            fullWidth 
            className='mt-1' 
            size='medium' 
            onClick={() => router.push('/add-user')}
          >
            Add User
          </Button>
        </Grid>
        </Grid>
      
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortDirection}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortDirection}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'linkedinURL'}
                  direction={sortDirection}
                  onClick={() => handleSort('linkedinURL')}
                >
                  LinkedIn URL
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'gender'}
                  direction={sortDirection}
                  onClick={() => handleSort('gender')}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUserList.map(user => (
              <React.Fragment key={user.id}>
                <TableRow
                  hover
                  onClick={() => handleRowClick(user.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.linkedinURL ?? 'N/A'}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                    <Button onClick={(e) => { e.stopPropagation(); handleRowClick(user.id); }}>
                      {expandedRowId === user.id ? 'Hide Address' : 'Show Address'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        router.push(`/edit-user/${user.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleDeleteClick(user.id, user.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandedRowId === user.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <div className="overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 p-4">
                        <strong>Address:</strong>
                        <div>
                          {user.address?.address1}, {user.address?.address2}, {user.address?.city}, {user.address?.state}, {user.address?.pin}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete the user: ${selectedUserName}?`}
      />
    </Container>
  );
};

export default UserList;
