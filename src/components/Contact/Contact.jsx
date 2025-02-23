import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser, FaPhone, FaEdit } from 'react-icons/fa';
import {
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete contact: ', error);
      toast.error('Failed to delete contact');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateContact({ contactId: contact.id, updatedData: { name, number } }),
      ).unwrap();
      toast.success('Contact updated successfully');
    } catch (error) {
      console.error('Failed to update contact: ', error);
      toast.error('Failed to update contact');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 1,
        boxShadow: 1,
        maxWidth: 500,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FaUser />
        {isEditing ? (
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginLeft: 0.5, marginBottom: 0.5 }}
          />
        ) : (
          contact.name
        )}
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FaPhone />
        {isEditing ? (
          <TextField
            value={number}
            onChange={e => setNumber(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginLeft: 1 }}
          />
        ) : (
          contact.number
        )}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaEdit />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowModal(true)}
            >
              Delete
            </Button>
          </>
        )}
      </Box>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={() => setShowModal(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
