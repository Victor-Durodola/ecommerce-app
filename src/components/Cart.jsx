import '../styles/cart.css'
import PropTypes from 'prop-types'
import { UseShoppingContext } from '../context/ShoppingContext'
import {AiOutlineRight, AiOutlineClose} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import data from '../data.json'

CartItems.propTypes = {
    id: PropTypes.number,
    quantity: PropTypes.number
}

export function CartItems (props) {
    const {increaseQty, decreaseQty, removeItem} = UseShoppingContext()
    const foundItem = data.find(item => item.id === props.id)
    
    return (
        <>
            <div className='cart-item'>
                <div className="cart-left">
                    <div className="cart-img" style={{backgroundImage: `url(${foundItem.imgUrl})`}}></div>
                    <div className="item-details">
                        <div className="name">{foundItem.name}</div>
                        <div className="left-bottom">
                            <div className="quantity-control">
                                <button className='cart-modify-btn' onClick={()=>{decreaseQty(props.id)}}>-</button>
                                <span className='count'>{props.quantity}</span>
                                <button className='cart-modify-btn' onClick={()=>{increaseQty(props.id)}}>+</button>
                            </div>
                            <div className="price">${foundItem.price}</div>
                        </div>
                    </div>
                </div>
                <div className="cart-right">
                    <AiOutlineClose onClick={()=>{removeItem(props.id)}} className='cart-remove-btn'/>
                    <div className="total">${(foundItem.price * props.quantity.toFixed(2))}</div>
                </div>
            </div>
        </>
    )
}

export default function Cart() {
    const {open, closeCart, cartQty, cartItem, removeAllItems } = UseShoppingContext()
    const totalCost = cartItem.reduce((total, currentItem) => {
        const found = data.find(item => item.id === currentItem.id);
        return (total + (currentItem.quantity * Number(found.price)))}, 0)

  return (
    <div className="cart" style={{translate: open? '0px' : '350px'}}>
        <div className="cart-header">
            <p>Shopping Cart ({cartQty})</p>
            <AiOutlineRight onClick={closeCart} className='cart-close-btn'/>
        </div>
        <div className="cart-container">
            {cartItem.map(item => <CartItems key={item.id} id={item.id} quantity={item.quantity}/>)}
        </div>
        <div className="cart-footer">
            <div className="cart-total">Total: ${totalCost.toFixed(2)}</div>
            <div className="delete-all-btn" onClick={removeAllItems}><RiDeleteBin6Line/></div>
        </div>
    </div>
  )
}
