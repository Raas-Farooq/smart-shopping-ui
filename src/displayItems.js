import React, {useState, useEffect, useRef, useReducer} from 'react';
import items from './shoppingItems.js';
import { FaChevronUp, FaChevronDown,  FaShoppingBag  } from 'react-icons/fa';
import styles from './app.module.css';
import { useGlobalContext } from './context.js';


const cartHandler = (state, action) => {
    switch(action.type){
        case 'INCREASE':
            return state.map(item => 
                item.id === action.id ? {...item, amount:item.amount + 1}: item
            )
        case 'DECREASE':
            return state.map(item => 
                item.id === action.id ? {...item, amount:Math.max(0, item.amount -1)}:item
            ).filter(item => item.amount > 0)

        case 'REMOVE':
            return state.filter(item =>
                item.id != action.id   
            )
        case 'CLEAR_ALL':
            return []
    }   
}


function DisplayItems(){
    const [totalPrice, setTotalPrice] = useState('')
    // const [shopItems, setShopItems]= useState(items);
    const {clearAll, totalCartItems,handleGlobalIncrease, handleGlobalDecrease} = useGlobalContext();

    const [shopItems, dispatch] = useReducer(cartHandler, items)

    const clear = useRef(null);
    const itemsRef = useRef(null);

    const handleIncrease = (id) => {
        handleGlobalIncrease();
        dispatch({type: 'INCREASE', id})
    }

    const handleDecrease = (id) => {
        handleGlobalDecrease()
        dispatch({type:'DECREASE', id})
    }

    const handleRemove = (id) => {
        handleGlobalDecrease()
        dispatch({type:'REMOVE', id})
    }
    
    const handleClearAll = (id) => {
        clearAll();
        dispatch({type:'CLEAR_ALL', id})
    }
   

    useEffect(() => {
        if(totalCartItems < 1){
            console.log(" No Item");
            itemsRef.current.style.boxShadow="none";
            itemsRef.current.innerText = "No Item Remaining";
            clear.current.style.display="none"
        }
        
        const totalPrice = shopItems.reduce((acc,item) => {
            
            return acc + (item.price * item.amount);
        },0)
        
        // const itemsHeight = itemsRef.current.getBoundingClientRect().height;
        setTotalPrice(totalPrice.toFixed(2));
    }, [shopItems, totalCartItems])
    
    return(
        <div className={styles.section}>
            <h1 className={styles.topFace} > YOUR CHOICE YOUR HAPPINESS</h1>
                <div className={styles.itemsCard} ref={itemsRef}>
                    {shopItems.map(item => {
                        return (
                            <div className={styles.singleItem} key={item.id} id={item.id}>
                                <div key={item.id} className={styles.titleImg}>

                                    <img  src={item.img} alt={item.title} width="80px" height="50px" />
                                    <h4 className={styles.itemTitle}>{item.title} </h4>
                                    <p className={styles.itemPrice}> ${item.price}</p>
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
                <div className={styles.footer}>
                <h3 className={styles.totalPrice}> Total ${totalPrice} </h3>
                    <button ref={clear} className={styles.clearAll} onClick={handleClearAll} > ClearAll </button>
                </div>
        </div>
    )
}

export default DisplayItems;