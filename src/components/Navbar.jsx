import '../styles/navbar.css'
import { UseShoppingContext } from '../context/ShoppingContext'
import {BsCart3} from 'react-icons/bs'
import { useRef } from 'react'
export default function Navbar() {
  const {cartQty, openCart, closeCart }= UseShoppingContext()
  const navBar = useRef()

  window.addEventListener('scroll', ()=> {
    if (window.scrollY > 50) {
      navBar.current.classList.add('dark-background');
    }else if (window.screenY <= 50) {
      navBar.current.classList.remove('dark-background');
    }
  })
  return (
    <div>
      <nav ref={navBar}>
        <div className="logo" onClick={closeCart}></div>
        {cartQty !== 0 && 
          <div className="cart-btn" onClick={openCart}>
            <BsCart3/>
            <div className="cart-count">{cartQty}</div>
          </div>
        }
      </nav>
    </div>
  )
}
