import axios from "axios";

import Card from '../../routes/Card';

import './styles.scss';

const HomePage = ({sneakers,searchValue,setSearchValue, setBasketItems, onAddToFavourite})=>{

  return (
    <div className='content p-40 '>
    <div className="d-flex align-center justify-between">
      <h1 className="content__title title">{searchValue ? `Пошук за запитом: ${searchValue}` : "Всі кросівки" }</h1> 
      <div className="content__search">
        <img src="/img/search.svg" alt="search"/>
        <input className="content__input" placeholder="Пошук..." onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}/>
      </div>
    </div>
    <div className="content__holder">
      {
        sneakers
        .filter(({name})=>name.toLowerCase().includes(searchValue.toLowerCase())).map(({id,name, price, imageURL})=>(
          <Card
            key={id}
            name={name}
            price={price}
            imageURL={imageURL}
            onClick={ (obj)=>{
                axios.post('https://649b9cff048075719236bd66.mockapi.io/basket', obj)
                .then(res =>setBasketItems(prev => [...prev, res.data]))
            }}
            onFavourite={()=>{onAddToFavourite({id,name, price, imageURL})}}
          />
        ))
      }
    </div>
  </div>
  )
}
export default HomePage;
