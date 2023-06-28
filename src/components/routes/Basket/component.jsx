import './styles.scss';

const Basket = ({onRemove, onClose, basketItems = []})=>{
  return (
    <div className="overlay">
      <div className="basket">
        <div className='d-flex justify-between'>
          <h2 className="title">Кошик</h2>
          <img onClick={onClose} className="basket__close" src="/img/btn-remove.svg" alt="sneakers"/>
        </div>
        {
          basketItems.length > 0 ? basketItems.map(({id,name, price, imageURL})=>(
            <div className="basket__item d-flex justify-between align-center">
            <img className="basket__img" src={imageURL} alt="sneakers"/>
            <div>
              <p className='basket__title'>{name}</p>
              <b className='basket__price'>{price}</b>
            </div>
            <img className="basket__close" src="/img/remove.svg" alt="remove" onClick={()=> onRemove(id)}/>
          </div>
          )) : 
          <div className='basket-empty'>
            <h5 className='basket-empty__title title'>Кошик пустий!</h5>
            <button className='basket-empty__btn btn' onClick={onClose}>Повернутися назад!</button>
          </div>
        }

      </div>
    </div>
  )
}
export default Basket;
