import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser, FaPhone, FaEdit } from 'react-icons/fa';
import css from './Contact.module.css';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
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
    <div className={css.contact}>
      <div>
        <h2 className={css.title}>
          <FaUser />
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : (
            contact.name
          )}
        </h2>
        <p className={css.number}>
          <FaPhone />
          {isEditing ? (
            <input
              type="text"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          ) : (
            contact.number
          )}
        </p>
      </div>

      {isEditing ? (
        <div className={css.buttonGroup}>
          <button className={css.button} type="button" onClick={handleUpdate}>
            Save
          </button>
          <button
            className={css.button}
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={css.buttonGroup}>
          <button
            className={css.button}
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className={css.button}
            type="button"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
