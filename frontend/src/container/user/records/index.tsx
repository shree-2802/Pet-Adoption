import GooglePayButton from '@google-pay/button-react';
import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../../redux/store';
import { getPetsData } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { petsDataType } from '../../../redux/slice/login';
import styles from './index.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { icons } from '../../../assets';
const Record = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [pets, setPets] = useState<petsDataType[] | null>(useSelector<RootState>(state => state.user.petsdata) as petsDataType[]);
    const cartStore = localStorage.getItem('cart-products');
    const [cart, setCart] = useState<string[]>(cartStore ? JSON.parse(cartStore) : []);
    const sold = JSON.stringify(localStorage.getItem('sold-cart'));
    const role = useLocation().state.data.role;
    useEffect(() => {
        dispatch(getPetsData())
    }, [dispatch])
    useEffect(() => {
        localStorage.setItem('cart-products', JSON.stringify(cart));
    }, [cart])
    return (
        <div className={styles.record_listing}>
            {
                pets?.length === 0 ? <p>There is no item in the store now</p> : (
                    <div className={styles.container}>
                        {
                            <>
                                {role !== "admin" && cart.length !== 0 && <button onClick={() => navigate('/user/cart', { state: { data: pets } })} className={styles.viewCart_button}>VIEW CART <div><icons.FaShoppingCart className={styles.cartIcon} /><div className={styles.notification}>{cart.length}</div></div></button>}
                                {pets?.map(pet => !sold.includes(pet.petid) && <div className={styles.petdata_display}>
                                    <div className={styles.image_container}>
                                        <img src={pet.profile_image} alt='profile' />
                                    </div>
                                    <div className={styles.text_content}>
                                        <div>
                                            <p>{pet.breed_name}</p>
                                            {/* <p><span style={{ color: "green" }}>Rs.</span>{pet.price}</p> */}
                                        </div>
                                        <p className={styles.description}>{pet.description}</p>
                                    </div>
                                    {role === "admin" ? <></> :
                                        <div className={styles.add_cart}>
                                            <button onClick={() => setCart((prevState) => prevState.includes(pet.petid) ? prevState.filter(id => id != pet.petid) : [...prevState, pet.petid])}> {cart.length >= 0 && cart.includes(pet.petid) ? 'Added to cart' : 'Add to cart'}</button>
                                        </div>
                                    }
                                </div>)
                                }
                            </>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Record
