import * as React from 'react';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styles from './MediaCard.module.css';
import { useNavigate } from 'react-router-dom';
import myImage from '../profile-images/jenny.jpg';
import { useCookies } from "react-cookie";
import { fetchUserById, fetchImage } from "../utils/apiUtils";
import AccountCircle from '@mui/icons-material/AccountCircle';

function MediaCard( { nome, cidade, uf, descricao, id } ) {
  const descricaoLimitada = descricao.length > 130 ? `${descricao.slice(0, 130)}...` : descricao;
  const navigate = useNavigate();
  const nomeCompleto = nome;
  const nomeArray = nomeCompleto.split(' ');
  let nomeFormatado = '';
  let sobrenomeFormatado = '';
  const [cookies, setCookies] = useCookies([
    "carerToken",
    "patientToken",
    "username",
  ]);
  
  const [userData, setUserData] = useState('');
  
  useEffect(() => {
    let token
    if (cookies.carerToken) {
      token = cookies.carerToken
    } else if (cookies.patientToken) {
      token = cookies.patientToken
    }

    fetchUserById(id, token).then((data) => {      
      fetchImage(data.login, token).then((imageUrl) => {
          const divElement = document.getElementById(`carer_pic_media${id}`);
          console.log(divElement)
          divElement.style.backgroundImage = `url(${imageUrl})`;
      })
      .catch((error) => {
          console.log(error.message);
      });   

      setUserData(data);
    });

}, []);
    

  if (nomeArray.length > 2){
    nomeFormatado = nomeArray[0];
    sobrenomeFormatado = nomeArray[nomeArray.length-1];
    nomeFormatado = nomeFormatado+" "+sobrenomeFormatado;
  }else{
    nomeFormatado = nome
  }

  const handleClick = () => {
    localStorage.removeItem('currentCarerId');
    localStorage.setItem('currentCarerId', id);
    navigate(`/carer`);
  };
  
  // Renderização condicional quando userData estiver definido
  if (userData === null) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className={styles.card}>
      {userData.path ? (
      <div id={`carer_pic_media${id}`} className={styles.caregiver_image}></div>
      ) : (
      <div className={styles.caregiver_image}><AccountCircle className={styles.button_icon} /></div>
      )}
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom variant="h5" component="div">
            {nomeFormatado}
        </Typography>
        <Typography className={styles.description} variant="body2" color="text.secondary">
            {descricaoLimitada}
        </Typography>
        <Typography className={styles.location} variant="body2" color="text.secondary">
            < LocationOnOutlinedIcon className={styles.location_icon}/>
            <span>{cidade}, {uf}</span>
        </Typography>

      </CardContent>
      <CardActions>
        <Button className={styles.button} size="small" onClick={handleClick}>Ver mais</Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard