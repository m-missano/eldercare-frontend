import styles from "./Backdrop.module.css";

function Backdrop({ closeNav }) {
  return (
    <div className={styles.backdrop} onClick={closeNav} >
    
    </div>
  );
};

export default Backdrop