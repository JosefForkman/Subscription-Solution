'use client';
import styles from './../../components/AddForm/addForm.module.css';

export default function FormSubmitButton() {
  const handleSubmit = (event: any) => { // for some reason the form wont submit if the button is disabled after it was pressed
    event.currentTarget.disabled = true;
  };
  return (
    <>
      <button
        className={`${styles.addButton} bg-accent text-white`}
        type="submit"
        // onClick={handleSubmit} 
      >
        Lägg till
      </button>
    </>
  );
}
