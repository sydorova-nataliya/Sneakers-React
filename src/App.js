import { useState, useEffect } from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom';

import Header from "./components/routes/Header";
import Basket from "./components/routes/Basket";
import HomePage from "./components/pages/HomePage";
import FavoritesPage from "./components/pages/FavoritesPage";

const App=()=> {
  const [cartOpened, setCartOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  console.log(favorites);
  useEffect(()=>{
    async function fetchData(){
      const sneakersResp = await axios.get('https://649b9cff048075719236bd66.mockapi.io/items');
      const basketItemsResp =await axios.get('https://649b9cff048075719236bd66.mockapi.io/basket');
      const favoritesResp =await axios.get('https://649c7b6e0480757192383bfc.mockapi.io/favourites');

      setBasketItems(basketItemsResp.data);
      setFavorites(favoritesResp.data);
      setSneakers(sneakersResp.data);
    }
    fetchData();
  }, [])

  const onAddToFavorite= async(obj)=>{
    try{
      if(favorites.find((item)=>item.id===obj.id)){
        axios.delete(`https://649c7b6e0480757192383bfc.mockapi.io/favourites/${obj.id}` );
      }else{
        const {data} = await axios.post('https://649c7b6e0480757192383bfc.mockapi.io/favourites', obj);
        setFavorites((prevItem=> [...prevItem, data]));
      }
    } catch(error){
      console.log("Error");;
    }
  }

  return (
    <div className='wrapper clear'>
    {cartOpened && <Basket 
        key={basketItems.id} 
        basketItems = {basketItems}
        onClose={()=>setCartOpened(false)} 
        onRemove={(id)=>{
          axios.delete(`https://649b9cff048075719236bd66.mockapi.io/basket/${id}`);
          setBasketItems((prevItem)=> prevItem.filter((item)=> Number(item.id)!==Number(id)));
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
          setSearchValue={setSearchValue} 
          setBasketItems={setBasketItems}
          onAddToFavorite={onAddToFavorite}/>
        }
      ></Route>
      <Route
        path="/favorites"
        exact
        element={
        <FavoritesPage 
          favorites={favorites}     
          setBasketItems={setBasketItems}        
          onAddToFavorite={onAddToFavorite}/>}
      ></Route>
    </Routes>
  </div>
  );
}

export default App;
