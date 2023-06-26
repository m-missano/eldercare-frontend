import React, { useState, useRef } from 'react';
import { Avatar, IconButton, Modal, Button } from '@material-ui/core';
import { AccountCircle, AddCircleOutline, Close } from '@material-ui/icons';
import styles from './Profile.module.css';

const Profile = ({ onSelectFile }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
    onSelectFile(file);
  };

  return (
    <div className={styles.profileContainer}>
      <Avatar className={styles.avatar} src={selectedFile ? URL.createObjectURL(selectedFile) : ''}>
        {!selectedFile && <AccountCircle className={styles.avatar} fontSize="large" />}
      </Avatar>
      <IconButton onClick={handleOpen} className={styles.addButton}>
        <AddCircleOutline fontSize="large" className={styles.addCircle} />
      </IconButton>
      <Modal open={open} onClose={handleClose} className={styles.modal} BackdropProps={{ onClick: handleClose }}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Selecione uma foto</h2>
            <IconButton onClick={handleClose} className={styles.closeButton}>
              <Close />
            </IconButton>
          </div>
          <div className={styles.dashedBorder}>
            <AddCircleOutline className={styles.dashedIcon} onClick={() => fileInputRef.current.click()} />
            <p className={styles.dashedText}>{fileName ? fileName : 'Insira um arquivo'}</p>
          </div>
          <Button variant="contained" color="primary" className={styles.saveButton} onClick={handleClose}>
            Salvar
          </Button>
        </div>
      </Modal>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Profile;