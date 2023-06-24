import { useState } from 'react';
import styles from './ReadMoreReadLess.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';

function ReadMoreReadLess({ description, onSave, allow=true }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleEditing = () => {
    if (editing) {
      onSave(editedDescription);
    }
    setEditing(!editing);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };
  
  return (
    <div className={styles.readMoreLess}>
      <button onClick={toggleExpanded}>
        {expanded ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
      {expanded && (
        <div className={styles.description_box}>
           {editing ? (
            <>
              <textarea
                className={styles.descriptionTextarea}
                value={editedDescription}
                onChange={handleDescriptionChange}
              ></textarea>
              <IconButton className={styles.saveButton} onClick={toggleEditing}>
                <SaveIcon className={styles.saveIcon}/>
              </IconButton>
            </>
          ) : (
            <>
              <div className={styles.descriptionText}>{description}</div>
              {allow && (
              <IconButton className={styles.editButton} onClick={toggleEditing}>
                <EditIcon className={styles.editIcon}/>
              </IconButton>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ReadMoreReadLess;