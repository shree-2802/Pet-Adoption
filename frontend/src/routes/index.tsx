import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRouting from '../utils/protectedRouting'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { userType } from '../redux/slice/login'
import AdminHome from '../container/admin/home'
import Login from '../container/login'
import UserHome from '../container/user/home'
import Layout from '../layout'
import { pets } from '../constants/data'
import AddPet from '../container/admin/addpet'
import Feedbacks from '../container/admin/feedbacks'
import AdoptPet from '../container/user/postpets'
import AboutUs from '../container/user/aboutus'
import Contact from '../container/user/contact'
import Record from '../container/user/records'
import PetsListing from '../container/admin/Pets'
import Community from '../container/admin/community'
import CartItems from '../container/user/cart'
import DoctorHome from '../container/doctor/home'
import CommunityInDoctor from '../container/doctor/community'
import DonateMoney from '../container/user/postpets/donatemoney'
import DonorsList from '../container/admin/donors'
import Instruction from '../container/doctor/rules'

const App = () => {
    const user: userType = useSelector<RootState>(state => state.user.loggedInUser) as userType;
    let adminAuth = false;
    let userAuth = false;
    let doctorAuth = false;
    if (user) {
        adminAuth = user.role === 'admin' ? true : false;
        userAuth = user.role === 'user' ? true : false;
        doctorAuth = user.role === 'doctor' ? true : false;
    }

    return (
        <Routes>
            <Route path="/" index element={<Login />} />
            {/* admin protected route */}

            <Route path="/admin/*" element={<ProtectedRouting isAuthenticated={adminAuth} />}>
                <Route element={<Layout usertype={user?.role} />}>
                    <Route index path='home' element={<AdminHome />}></Route>
                    <Route path="addpet" element={<AddPet />} />
                    <Route path="feedbacks" element={<Feedbacks />} />
                    <Route path='pets' element={<PetsListing />} />
                    <Route path='community' element={<Community />} />
                    <Route path="donorlist" element={<DonorsList />} />
                </Route>
            </Route>

            {/*  user protected route */}

            <Route path="/user/*" element={<ProtectedRouting isAuthenticated={userAuth} />}>
                <Route element={<Layout usertype={user?.role} />}>
                    <Route index path="home" element={<UserHome />} />
                    <Route path="salepet" element={<AdoptPet />} />
                    <Route path='aboutus' element={<AboutUs />} />
                    <Route path="records" element={<Record />} />
                    <Route path='contact' element={<Contact />} />
                </Route>
                <Route path='cart' element={<CartItems />} />
                <Route path="donatemoney" element={<DonateMoney />} />
            </Route>

            {/* doctor protected route*/}
            <Route path="/doctor/*" element={<ProtectedRouting isAuthenticated={doctorAuth} />}>
                <Route element={<Layout usertype={user?.role} />}>
                    <Route index path='home' element={<DoctorHome />} />
                    <Route path='community' element={<CommunityInDoctor />} />
                    <Route path='instruction' element={<Instruction />} />
                </Route>
            </Route>
        </Routes>

    )
}

export default App
