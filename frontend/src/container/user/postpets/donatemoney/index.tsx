import React, { useState } from 'react'
import styles from './index.module.scss';
import { icons } from '../../../../assets';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../redux/store';
import { Value } from 'sass';
import { userSliceType, userType } from '../../../../redux/slice/login';
import { postDonation } from '../../../../redux/actions';
const DonateMoney = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number | null>();
    const userInfo: userType = useSelector<RootState>(state => state.user.loggedInUser) as userType;
    const dispatch = useAppDispatch();
    const submitMoney = () => {
        console.log("in here")
        if (!amount) {
            alert("Enter valid amount")
        }
        else {
            var options = {
                key: key,
                key_secret: keysecret,
                amount: amount * 100,
                currency: "INR",
                name: "Padma Shree",
                description: "Donating for upliftment of pets",
                handler: (res: any) => {
                    setAmount(null);
                    navigate('/user/home');
                    const payload = {
                        user_id: userInfo.userid,
                        email_id: userInfo.email,
                        amount: amount
                    }
                    dispatch(postDonation(payload))
                },
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                    contact: userInfo.phone,
                },
                notes: {
                    address: "Razorpay corp",
                },
                theme: {
                    color: "#000"
                }
            };
            const pay = new (window as any).Razorpay(options);
            pay.open();

        }
    }
    return (
        <div className={styles.cart_order}>
            <icons.TiArrowBack className={styles.back} onClick={() => navigate('/user/salepet')} />
            <div className={styles.cart_access}>
                <div>
                    <h4>Donation</h4>
                    <p>
                        Hello dear {userInfo.name} we are really greatfull for your volunteer invlovement in
                        donating money for pets this might seem to be a very formal greet but this donation will
                        surely help many pets!“The most precious thing I have to give is my time. “It is every man's
                        obligation to put back into the world at least the equivalent of what he takes out of it.
                        “No act of kindness, no matter how small, is ever wasted. “Think of giving not as a duty,
                        but as a privilege.That is what we're all collectively working towards. And real change takes work,
                        but we can't do it alone. Your donations help charities work towards creating a
                        society that benefits everyone, leaving no one behind.
                    </p>
                    <div className={styles.bt_section}>
                        <input type='number' value={amount ? amount : ''} onChange={(e) => setAmount(parseInt(e.target.value))} placeholder='Enter donation amount' />
                        <button onClick={submitMoney}>submit</button>
                    </div>
                </div>
                {/* <div className={styles.purchase}>
                    {/* <button onClick={submit}>Purchase</button>
                </div> */}
            </div>
        </div>
    )

}

export default DonateMoney
