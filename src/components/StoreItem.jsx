import '../styles/store.css'
import { UseShoppingContext } from '../context/ShoppingContext'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {AiOutlineClose, AiOutlineEye, AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'

StoreItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    imgUrl: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string

}

export default function StoreItem(props) {
    const {increaseQty, decreaseQty, removeItem, itemQty} = UseShoppingContext()
    const [openBox, setOpen] = useState(false)

    const style = {
        scale: openBox? '100%' : '0%'
    }

    const toggleOpen =()=> {
        setOpen(prev => !prev)
    }

    return (
        <>
        <div className='store-item'>
            <div className="image" style={{backgroundImage: `url(${props.imgUrl})`}}>
                <div className="action-btn" onClick={toggleOpen}><AiOutlineEye/></div>
                <div className="action-btn" onClick={()=>{increaseQty(props.id)}}><AiOutlinePlus/></div>
            </div>
            <div className="details">
                <div className="category">{props.category}</div>
                <div className="item-name" style={{display: 'inline-block'}}>{props.name}</div>
                {itemQty(props.id) !== 0 && 
                    <span style={{display: 'inline-block', marginLeft:'.5rem', color: 'green'}}>
                        {itemQty(props.id)} in cart
                    </span>}
                <div className="item-price">${props.price}</div>
            </div>
            {itemQty(props.id) === 0? <div className="add-btn" onClick={()=>{increaseQty(props.id)}}> Add to cart</div> :
            <div className="item-quantity">
                <div className="modify-qty no-margin">
                    <button className='modify-btn' onClick={()=>{decreaseQty(props.id)}}>-</button>
                    <span className='count'>{itemQty(props.id)}</span>
                    <button className='modify-btn' onClick={()=>{increaseQty(props.id)}}>+</button>
                </div>
                <button className='remove-btn no-margin' onClick={()=>{removeItem(props.id)}}><RiDeleteBin6Line/>Remove</button>
            </div>
            }
        </div>

        <div className='expanded-store-item' style={style}>
            <AiOutlineClose onClick={toggleOpen} className='close-btn'/>
            <div className="item-wrapper">
                <div className="expanded-image" style={{backgroundImage: `url(${props.imgUrl})`}}> </div>
                <div className="expanded-details">
                    <div className="category">{props.category}</div>
                    <div className="item-name">{props.name}</div>
                    <div className="description">
                        {props.description}
                    </div>
                    <div className="item-price">${props.price}</div>
                    <div className="modify-qty">
                        <button className='modify-btn' onClick={()=>{decreaseQty(props.id)}}>-</button>
                        <span className='count'>{itemQty(props.id)}</span>
                        <button className='modify-btn' onClick={()=>{increaseQty(props.id)}}>+</button>
                    </div>
                    <button className='remove-btn' onClick={()=>{removeItem(props.id)}}><RiDeleteBin6Line/>Remove</button>
                </div>
            </div>
        </div>
        </>
  )
}
