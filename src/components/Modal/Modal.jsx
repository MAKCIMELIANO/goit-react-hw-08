import css from './Modal.module.css';

export default function Modal({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this contact?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}
