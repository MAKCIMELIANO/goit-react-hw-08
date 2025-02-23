import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser, FaPhone } from 'react-icons/fa';
import css from './Contact.module.css';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className={css.contact}>
      <div>
        <h2 className={css.title}>
          <FaUser />
          {contact.name}
        </h2>
        <p className={css.number}>
          <FaPhone /> {contact.number}
        </p>
      </div>

      <button
        className={css.button}
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
