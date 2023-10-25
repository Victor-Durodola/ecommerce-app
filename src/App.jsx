//import { useState } from 'react'
import './App.css'
import './index.css'
import Cart from './components/Cart'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import StoreList from './components/StoreList'
import ShoppingContext from './context/ShoppingContext'

function App() {

  return (
    <>
      <ShoppingContext>
        <div className="container">
          <Cart/>
          <Navbar/>
          <Hero/>
        </div>
        <StoreList/>
      </ShoppingContext>
    </>
  )
}

export default App
