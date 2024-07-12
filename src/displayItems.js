import React, {useState, useEffect, useRef} from 'react';
import items from './shoppingItems.js';
import { FaChevronUp, FaChevronDown,  FaShoppingBag  } from 'react-icons/fa';
import styles from './app.module.css';


function DisplayItems(){
    const [totalPrice, setTotalPrice] = useState('')
    
    const itemsRef = useRef(null);

    const handleIncrease = (e) => {
        console.log('e.target: ', e.currentTarget.parentElement.parentElement);
    }


    useEffect(() => {
        const totalPrice = items.reduce((acc,item) => {
            
            return acc + (item.price * item.amount);
        },0)
        // const itemsHeight = itemsRef.current.getBoundingClientRect().height;
        setTotalPrice(totalPrice.toFixed(2));
    }, [items])
    
    return(
        <div className='section'>
            <div className={styles.itemsCard} ref={itemsRef}>
                {items.map(item => {
                    return (
                        <div className={styles.singleItem} key={item.id}>
                            <div key={item.id} className={styles.titleImg}>

                                <img  src={item.img} alt={item.title} width="80px" height="60px" />
                                <h4 className='title'>{item.title} </h4>
                                <p>{item.price}</p>
                                <button> remove </button>
                            
                            </div>
                            <div className='handleShop'>
                                <button onClick={handleIncrease}> <FaChevronUp /> </button>
                                <p> {item.amount}</p>
                                <button> <FaChevronDown /> </button>
                            </div>
                        </div>
                        

                    )
                })}
            </div>
        </div>
    )
}

export default DisplayItems;