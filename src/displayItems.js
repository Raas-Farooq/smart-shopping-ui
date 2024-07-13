import React, {useState, useEffect, useRef, useReducer} from 'react';
import items from './shoppingItems.js';
import { FaChevronUp, FaChevronDown,  FaShoppingBag  } from 'react-icons/fa';
import styles from './app.module.css';
import { useGlobalContext } from './context.js';



const cartReducer = (state, action) => {
        
    switch(action.type){
        case 'increase':
           return state.map(item => 
                item.id === action.id ? {...item, amount:item.amount+1}: item
            );
        
        case 'decrease':
            return state.map(item => 
                
                item.id === action.id ? {...item, amount:Math.max(0,item.amount-1)}:item
            ).filter(item => item.amount > 0);
        
        case 'remove':
            return state.filter(item => item.id != action.id);

        case 'clearAll':
            return [];

        default:
            return state
    }
}


function DisplayItems(){
    const [totalPrice, setTotalPrice] = useState('')
    // const [shopItems, setShopItems]= useState(items);
    const {clearAll, totalCartItems,handleGlobalIncrease, handleGlobalDecrease} = useGlobalContext();

    const [shopItems, dispatch] = useReducer(cartReducer, items);


    const clear = useRef(null);
    const itemsRef = useRef(null);

    const handleClearAll = () => {
        clearAll();
        dispatch({type:'clearAll'})
    }

    const handleIncrease = (id) => {
        handleGlobalIncrease();
        dispatch({type: 'increase', id})
    }

    const handleDecrease = (id) => {
        handleGlobalDecrease()
        dispatch({type:'decrease', id})
    }

    const handleRemove = (id) => {
        handleGlobalDecrease()
        dispatch({type:'remove', id})
    }
    // const handleIncrease = (id) => {
    //     handleGlobalIncrease();
    //     setShopItems((prevItems) => 
    //          prevItems.map(item => 
    //             item.id === id ? {...item, amount: item.amount + 1}: item
    //         )
    //     )
    // }

    // const handleDecrease = (id) => {
    //     handleGlobalDecrease();
    //     setShopItems((prevItems) => {
    //         return (
    //             prevItems.map(item => item.id === id ? {...item, amount: item.amount - 1}: item).filter(item => item.amount > 0)
    //         )
    //     })
    // }


    // function handleRemove(id){
    //     handleGlobalDecrease();
    //     console.log("handle Remove is Going Fast");
    //     setShopItems((prevItems) => 
    //     prevItems.filter(cart => cart.id != id ))
    // }

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
            <h3 className={styles.totalPrice}> Total Price {totalPrice} </h3>
            
                <div className={styles.itemsCard} ref={itemsRef}>
                    {shopItems.map(item => {
                        return (
                            <div className={styles.singleItem} key={item.id} id={item.id}>
                                <div key={item.id} className={styles.titleImg}>

                                    <img  src={item.img} alt={item.title} width="80px" height="60px" />
                                    <h4 className={styles.itemTitle}>{item.title} </h4>
                                    <p className={styles.itemPrice}>{item.price}</p>
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
                <div>
                    <button ref={clear} className={styles.clearAll} onClick={handleClearAll} > ClearAll </button>
                </div>
        </div>
    )
}

export default DisplayItems;