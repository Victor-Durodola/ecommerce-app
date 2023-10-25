import React, { useContext, useState }from 'react'
import PropTypes from 'prop-types'
import UseLocalStorage from '../Hooks/UseLocalStorage'

const StoreContext = React.createContext()

export const UseShoppingContext =()=> {
    return useContext(StoreContext)
}

ShoppingContext.propTypes = {
    children: PropTypes.any
}

export default function ShoppingContext(props) {
    const [cartItem, setCartItem] = UseLocalStorage('shoppingCart',[])
    const [open, setOpen] = useState(false)

    const openCart=()=> {
        setOpen(true)
    }
    
    const closeCart=()=> {
        setOpen(false)
    }

    const itemQty =(id)=> {
        return cartItem.find(item => item.id === id)?.quantity || 0
    }

    const increaseQty =(id)=> {
        setCartItem(element => {
            if (element.find(item => item.id === id) == null) {
                return [...cartItem, {id, quantity: 1}]
            }else {
                return element.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item
                    }
                })
            }
        })
    }
    
    const decreaseQty =(id)=> {
        setCartItem(element => {
            if (element.find(item => item.id ===id)?.quantity == 1) {
                return element.filter(item => item.id !== id)
            }else {
                return element.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else {
                        return item
                    }
                })
            }
        })
    }

    const removeItem =(id)=> {
        setCartItem(current => {
            return current.filter(item => item.id !== id)
        })
    }

    const removeAllItems =()=> {
        setCartItem([])
    }

    const cartQty = cartItem.reduce((total, item) => item.quantity + total, 0)

    const value = {
        itemQty,
        removeItem,
        increaseQty,
        decreaseQty,
        openCart,
        closeCart,
        cartItem,
        cartQty,
        open,
        removeAllItems
    }
  return (
    <div>
      <StoreContext.Provider value={value}>
        {props.children}
      </StoreContext.Provider>
    </div>
  )
}
