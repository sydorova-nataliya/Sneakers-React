import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Basket from "./components/Basket";

const App=()=> {
  const [cartOpened, setCartOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{
    axios.get('https://649b9cff048075719236bd66.mockapi.io/items')
      .then(res=> setSneakers(res.data))
    axios.get('https://649b9cff048075719236bd66.mockapi.io/basket')
      .then(res=> setBasketItems(res.data))
  }, [])

  return (
    <div className='wrapper clear'>
    {cartOpened && <Basket 
        key={basketItems.id} 
        basketItems = {basketItems}
        onClose={()=>setCartOpened(false)} 
        onRemove={(id)=>{
          axios.delete(`https://649b9cff048075719236bd66.mockapi.io/basket/${id}`)
          setBasketItems((prevItem)=> prevItem.filter((item)=> item.id!==id))
        }}
      />
    }
    <Header onClickCart={()=>setCartOpened(true) }/>
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
                setBasketItems([...basketItems, obj])
              }}
            />
          ))
        }
      </div>
    </div>
  </div>
  );
}


export default App;
