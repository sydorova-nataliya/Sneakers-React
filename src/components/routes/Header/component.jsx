import {Link} from 'react-router-dom';

import './styles.scss';

const Header = ({onClickCart})=>{
  return (
    <header className="header d-flex justify-between align-center p-40">
      <div className='header-left d-flex align-center'>
        <Link to="/">
          <img className="header__logo" src="/img/logo.svg" alt="logo"/>
        </Link>
        <h3 className='header__title title'>React Sneakers</h3>
      </div>
      <ul className="header-right  d-flex">
        <li className="mr-30" onClick={onClickCart}>
          <img className="header__btn cu-p" src="/img/basket.svg" alt="basket"/>
        </li>
        <li className="mr-30">
          <Link to="/favorites"><img className="header__btn" src="/img/like.svg" alt="like"/></Link>
        </li>
        <li>
          <img className="header__btn" src="/img/account.svg" alt="account"/>
        </li>
      </ul>
    </header> 
  )
}

export default Header;
