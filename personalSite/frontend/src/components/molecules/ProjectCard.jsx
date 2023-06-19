import styles from './projectCard.module.scss';
import { ModalDataDispatchContext } from '../../contexts/ModalDataContext';

import { useContext } from 'react';

const ProfileCard = ({ project, order, onToggleModal }) => {
  const dispatch = useContext(ModalDataDispatchContext);
  const { id, name, description, imgURL, redirrect } = project;

  const handleEditProject = () => {
    dispatch({
      type: 'edit',
      data: project,
    });

    onToggleModal();
  }

  const handleDeleteProject = () => {
    dispatch({
      type: 'delete',
      id,
    });

    onToggleModal();
  }

  return (
    <div className={`${styles.profileCard} ${styles[order]}`}>
      <div className={styles.profileInfo}>
        <h2 className={styles.name}>{name}</h2>
        <small className={styles.description}>{description}</small>
      </div>
      <div className={styles.profileImageWrapper}>
        <div 
          className={styles.profileImage} 
          style={{backgroundImage: `url(${imgURL})`}}
        /> 
      </div>
      <button onClick={handleEditProject}>Edit</button>
      <button onClick={handleDeleteProject}>Delete</button>
    </div>
  );
};
  

export default ProfileCard;
