import { useState } from 'react';

import './styles.scss';

const Card = ({ name, price, imageURL, onClick})=>{
  const [isAdded, setIsAdded] = useState(false);
  const handlePlus=()=>{
    onClick({name, price, imageURL});
    setIsAdded(!isAdded);
  }
  return (
  <div className="card">
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