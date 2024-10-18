import React, { useEffect, useState } from 'react'
import { petsDataType } from '../../../redux/slice/login';
import { icons } from '../../../assets';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { successPurchase } from '../../../utils/sweetalert';

const CartItems = () => {
    const cartStore = localStorage.getItem('cart-products');
    const soldCart = localStorage.getItem('sold-cart');
    const [cart, setCart] = useState<string[]>(cartStore ? JSON.parse(cartStore) : []);
    const [sold, setSold] = useState<string[]>(soldCart ? JSON.parse(soldCart) : []);
    const location = useLocation();
    const pets: petsDataType[] = location.state && location.state.data ? location.state.data : [];
    let totalAmount = 0;
    const navigate = useNavigate();

    const submit = () => {
        if (cartStore) {
            let alreadySold = sold;
            cart.forEach(cartItem => alreadySold.push(cartItem));
            localStorage.setItem('sold-cart', JSON.stringify(alreadySold));
        }
        successPurchase();
        localStorage.setItem('cart-products', JSON.stringify(''));
        navigate('/user/home');
    }

    useEffect(() => {
        cart.forEach(id => {
            pets.forEach(pet => (pet.petid === id ? totalAmount += pet.price : totalAmount = totalAmount))
        })
    }, [cart])

    return (
        <div className={styles.cart_order}>
            <icons.TiArrowBack className={styles.back} onClick={() => navigate('/user/records', { state: { data: { role: 'user' } } })} />
            <div className={styles.cart_access}>
                {
                    !cart ? <h1>Cart Empty</h1> :
                        <div className={styles.div_c}>
                            {cart?.map(id => {
                                const pet = pets.find(pet => pet.petid === id);
                                if (pet) {
                                    return (
                                        <div key={id} className={styles.cart_item}>
                                            <p>{pet.breed_name}</p>
                                            <icons.RxCross2 className={styles.cross_icon} onClick={() => setCart(prevState => prevState.filter(itemId => itemId !== pet.petid))} />
                                        </div>
                                    );
                                } else {
                                    return <></>;
                                }
                            })}
                        </div>
                }
                <div className={styles.purchase}>
                    <button onClick={submit}>Purchase</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems;
