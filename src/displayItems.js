import React, {useState, useEffect, useRef} from 'react';
import items from './shoppingItems.js';
import { FaChevronUp, FaChevronDown,  FaShoppingBag  } from 'react-icons/fa';
import styles from './app.module.css';
import { useGlobalContext } from './context.js';

function DisplayItems(){
    const [totalPrice, setTotalPrice] = useState('')
    const [shopItems, setShopItems]= useState(items);
    const {myMessage} = useGlobalContext();

    const itemsRef = useRef(null);

    
    const handleIncrease = (id) => {
        setShopItems((prevItems) => 
             prevItems.map(item => 
                item.id === id ? {...item, amount: item.amount + 1}: item
            )
        )
    }

    const handleDecrease = (id) => {
        setShopItems((prevItems) => {
            return (
                prevItems.map(item => item.id === id ? {...item, amount: item.amount - 1}: item).filter(item => item.amount > 0)
            )
        })
    }


    function handleRemove(id){
        console.log("handle Remove is Going Fast");
        setShopItems((prevItems) => 
        prevItems.filter(cart => cart.id != id ))
    }

    useEffect(() => {
        console.log("myMessage: useEffect ", myMessage);
        console.log("shopItems: useEffect ", shopItems)
        const totalPrice = shopItems.reduce((acc,item) => {
            
            return acc + (item.price * item.amount);
        },0)
        
        // const itemsHeight = itemsRef.current.getBoundingClientRect().height;
        setTotalPrice(totalPrice.toFixed(2));
    }, [shopItems])
    
    return(
        <div className='section'>
            {console.log("shopping Items: ",shopItems)}
            <h3 className={styles.totalPrice}> Total Price {totalPrice} </h3>
            <div className={styles.itemsCard} ref={itemsRef}>
                {shopItems.map(item => {
                    return (
                        <div className={styles.singleItem} key={item.id} id={item.id}>
                            <div key={item.id} className={styles.titleImg}>

                                <img  src={item.img} alt={item.title} width="80px" height="60px" />
                                <h4 className='title'>{item.title} </h4>
                                <p>{item.price}</p>
                                <button onClick={(e) => handleRemove(item.id)}> remove </button>
                            
                            </div>
                            <div className='handleShop'>
                                <button onClick={() => handleIncrease(item.id)}> <FaChevronUp /> </button>
                                <p> {item.amount}</p>
                                <button onClick={() => handleDecrease(item.id)}> <FaChevronDown /> </button>
                            </div>
                        </div>
                        

                    )
                })}
            </div>
        </div>
    )
}

export default DisplayItems;