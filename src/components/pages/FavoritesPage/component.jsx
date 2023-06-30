import axios from "axios";
import {Link} from 'react-router-dom';

import Card from '../../routes/Card';

import './styles.scss';

const FavoritesPage = ({favorites,setBasketItems, onAddToFavorite })=>{
  return (
    <div className='content p-40 '>
      <h1 className="content__title title">Мої закладки</h1> 
      {
        favorites.length > 0 && (
          <div className="content__holder">
            {favorites.map(({ id, name, price, imageURL }) => (
              <Card
                id={id}
                name={name}
                price={price}
                imageURL={imageURL}
                favorited={true}
                onFavourite={() => {
                  onAddToFavorite({ id, name, price, imageURL });
                }}
                onClick={(obj) => {
                  axios
                    .post('https://649b9cff048075719236bd66.mockapi.io/basket', obj)
                    .then((res) => setBasketItems((prev) => [...prev, res.data]));
                }}
              />
            ))}
        </div>
      )}
      {
        favorites.length === 0 && (
          <div className="favourites-empty">
            <img src="/img/favourites-empty.jpg" alt="favourites-empty" />
            <h5 className="favourites-empty__title">Закладок немає!</h5>
            <Link to="/" className="favourites-empty__link">
              <button className="favourites-empty__btn btn">Повернутися назад!</button>
            </Link>
          </div>
      )}
    </div>
  )
}

export default FavoritesPage;
