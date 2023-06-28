import { useState } from 'react';

import './styles.scss';

const Card = ({id, name, price, imageURL, onClick, onFavourite, favorited = false})=>{
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favorited);
  const handlePlus=()=>{
    onClick({id,name, price, imageURL});
    setIsAdded(!isAdded);
  }
  const handleFavourite=()=>{
    onFavourite({id,name, price, imageURL});
    setIsFavourite(!isFavourite);
  }
  return (
  <div className="card">
    {isFavourite ?  <img  className='cu-p' src="img/liked.svg" alt="like" onClick={handleFavourite}/> : <img className='card__like cu-p ' src="img/like.svg" alt="like" onClick={handleFavourite}/>}
    <img className='card__img' src={imageURL} alt="sneakers"/>
    <h5 className='card__title'>{name}</h5>
      <div className="d-flex">
        <span className='card__subtitle'>Ціна: </span>
        <b className='card__price'>{price} грн.</b>
      </div>
      {isAdded ?  <img  className='card__btn-checked' src= "/img/plus-checked.svg" alt="button" onClick={handlePlus}/> : <img className='card__btn' src="/img/plus.svg" alt="button" onClick={handlePlus}/>}
  </div>
  )
}

export default Card;
