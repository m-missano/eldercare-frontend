import * as React from 'react';
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

function MediaCard( { nome, cidade, uf, descricao, id } ) {
  const descricaoLimitada = descricao.length > 130 ? `${descricao.slice(0, 130)}...` : descricao;
  const navigate = useNavigate();
  const nomeCompleto = nome;
  const nomeArray = nomeCompleto.split(' ');
  let nomeFormatado = '';
  let sobrenomeFormatado = '';


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

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.cardMedia}
        image={myImage}
      />
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
        <Button size="small" onClick={handleClick}>Ver mais</Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard