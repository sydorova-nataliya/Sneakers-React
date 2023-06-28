import './styles.scss';

const Basket = ({onClose, basketItems = []})=>{
  return (
    <div className="overlay">
      <div className="basket">
        <div className='d-flex justify-between'>
          <h2 className="title">Корзина</h2>
          <img onClick={onClose} className="basket__close" src="/img/btn-remove.svg" alt="sneakers"/>
        </div>
        
        {
          basketItems.map(({id,name, price, imageURL})=>(
            <div className="basket__item d-flex justify-between align-center">
            <img className="basket__img" src={imageURL} alt="sneakers"/>
            <div>
              <p className='basket__title'>{name}</p>
              <b className='basket__price'>{price}</b>
            </div>
            <img className="basket__remove" src="/img/remove.svg" alt="remove"/>
          </div>
          ))
        }

      </div>
    </div>
  )
}
export default Basket;
