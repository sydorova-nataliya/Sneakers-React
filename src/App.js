import { useState, useEffect } from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom';

import Header from "./components/routes/Header";
import Basket from "./components/routes/Basket";
import HomePage from "./components/pages/HomePage";
import FavouritesPage from "./components/pages/FavouritesPage";
const App=()=> {
  const [cartOpened, setCartOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{
    axios.get('https://649b9cff048075719236bd66.mockapi.io/items')
      .then(res=> setSneakers(res.data))
    axios.get('https://649b9cff048075719236bd66.mockapi.io/basket')
      .then(res=> setBasketItems(res.data))
      axios.get('https://649c7b6e0480757192383bfc.mockapi.io/favourites')
      .then(res=> setFavourites(res.data))
  }, [])

  const onAddToFavourite= async(obj)=>{
    try{
      if(favourites.find((item)=>item.id===obj.id)){
        axios.delete(`https://649c7b6e0480757192383bfc.mockapi.io/favourites/${obj.id}` )
      }else{
        const {data} = await axios.post('https://649c7b6e0480757192383bfc.mockapi.io/favourites', obj)
        setFavourites((prevItem=> [...prevItem, data]))
      }
    } catch(error){
      console.log("Error");
    }

  }
  return (
    <div className='wrapper clear'>
    {cartOpened && <Basket 
        key={basketItems.id} 
        basketItems = {basketItems}
        onClose={()=>setCartOpened(false)} 
        onRemove={(id)=>{
          axios.delete(`https://649b9cff048075719236bd66.mockapi.io/basket/${id}`)
          setBasketItems((prevItem)=> prevItem.filter((item)=> Number(item.id)!==Number(id)))
        }}
      />
    }
    <Header onClickCart={()=>setCartOpened(true) }/>
    <Routes>
      <Route
        path="/"
        exact
        element={
          <HomePage 
          sneakers={sneakers} 
          searchValue={searchValue} 
          setFavourites={setFavourites} 
          setSearchValue={setSearchValue} 
          setBasketItems={setBasketItems}
          onAddToFavourite={onAddToFavourite}/>
        }
      ></Route>
      <Route
        path="/favourites"
        exact
        element={
        <FavouritesPage 
          favourites={favourites}     
          setBasketItems={setBasketItems}        
          onAddToFavourite={onAddToFavourite}/>}
      ></Route>
    </Routes>
  </div>
  );
}

export default App;
