import Header from './components/Header.jsx'
import FoodItems from './components/FoodItems.jsx';
import { useState, useEffect } from 'react';
import Cart from './components/Cart.jsx';
import Modal from './components/Modal.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const [userItems, setUserItems] = useState([]);
  const [cartClick, setCartClick] = useState(false);
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [checkoutClick, setCheckoutClick] = useState(false);


  useEffect(() => {
    const uniqueItems = userItems.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.id === item.id
      ))
    );

    const uniqueOrders = uniqueItems.map(uniqueItem => {
      const quantity = userItems.reduce((acc, item) => {
        return item.id === uniqueItem.id ? acc + 1 : acc;
      }, 0);
      return { ...uniqueItem, quantity };
    });
    setOrders(uniqueOrders);
  }, [userItems]);



  function handleSelectedItem(selectedMeal) {
    setUserItems((prevMeal) => {
      if (!prevMeal) {
        prevMeal = [];
      }
      return [selectedMeal, ...prevMeal]
    });
  }

  const handleAddItem = function (id) {
    setOrders(prev => {
      return prev.map((i => {
        if (i.id === id) {
          return { ...i, quantity: i.quantity + 1 }
        }
        return i;
      }));
    });

    setUserItems(pre => {
      const index = pre.findIndex(item => item.id === id);
      if (index !== -1) {
        const updatedItems = [...pre];
        const itemToInsert = pre[index];
        updatedItems.splice(index, 0, itemToInsert);
        return updatedItems;
      }
      return pre;
    });
  }


  const handleRemoveItem = function (id) {
    setOrders(prev => {
      return prev.map((i => {
        if (i.id === id) {
          if (i.quantity > 0) {
            return { ...i, quantity: i.quantity - 1 }
          }
          else {
            return null;
          }
        }
        return i;
      }))
    });


    setUserItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index !== -1) {
        const updatedItems = [...prev];
        updatedItems.splice(index, 1);
        return updatedItems;
      }
      return prev;
    });

  }


  const handleCartClick = function () {
    setCartClick((prev) => {
      if (prev === true) {
        return false;
      } else return true;
    });
  }


  const handleCheckoutClick = function () {
    setCheckoutClick((prev) => {
      if (prev === true) {
        return false;
      } else return true;
    });
  }

  const handleCloseModalCart = function () {
    setCartClick(false);
  }


  useEffect(() => {
    const totalQuantity = orders.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orders.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setQuantity([totalQuantity, totalPrice]);
  }, [orders]);

  const handleCloseModalCheckout = function () {
    setCheckoutClick(false);
    setCartClick(false);
  }

  function resetPostOrderSubmit() {
    setCheckoutClick(false);
    setCartClick(false);
    setOrders([]);
    setQuantity(0);
    setUserItems([]);
    setOrders([]);

  }

  return (
    <>
      <Header counter={quantity[0]} clickCart={handleCartClick}></Header>
      <FoodItems onSelectItem={handleSelectedItem}></FoodItems>
      <Modal open={cartClick} b1="Close" b2="Go To Checkout" close={handleCloseModalCart} utility={handleCheckoutClick}>
        {cartClick && !checkoutClick && (<Cart orders={orders} addItem={handleAddItem} removeItem={handleRemoveItem} checkout={handleCheckoutClick} total={quantity[1]}></Cart>)}
      </Modal>
      {checkoutClick && <Checkout total={quantity[1]} orders={orders} closeModal={handleCloseModalCheckout} checkoutClick={checkoutClick} resetEverything={resetPostOrderSubmit}></Checkout>}
    </>
  );
}

export default App;
