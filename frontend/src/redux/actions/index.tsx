import { Action, Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from '../../api/index';
import { userType } from "../slice/login";
import { postPetPayloadtype } from "../../container/user/postpets";
export type mailsendtype = {
    mail: String,
    type: String,
    reply?: String
}

export type postusertype = {
    email: String,
    phone: number,
    password: String,
    name: String,
}

export type donationType = {
    user_id: String,
    email_id: string,
    amount: number
}
//users
export const getUsers = createAsyncThunk('getuser', async () => {
    try {
        const response = await baseURL.get('/api/v1/user')
        console.log(response);
        return response.data;
    }
    catch (err) {
        console.log(err)
    }
})

export const postUser = createAsyncThunk('postuser', async ({ email, name, password, phone }: postusertype) => {
    try {
        const payload = {
            email,
            name,
            password,
            phone,
            role: "user"
        }
        const response = await baseURL.post('/api/v1/user', payload);
    }
    catch (err) {
        console.log(err);
        alert("Mail already exist");
    }
})

//petsdata
export const getPetsData = createAsyncThunk('getpetsData', async () => {
    try {
        const response = await baseURL.get('/api/v1/petsdata');
        console.log(response);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
})
export const postPetsdata = createAsyncThunk('postpetsdata', async (formdata: any) => {
    try {
        console.log(formdata, " in act")
        const response = await baseURL.post('/api/v1/petsdata', formdata)
        console.log(response, " res here");
    }
    catch (err) {
        console.log(err);
    }
})

export const getFeedbacks = createAsyncThunk('getFeedbacks', async () => {
    try {
        const response = await baseURL.get('/api/v1/feedbacks')
        console.log(response.data)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
})
export type postfeedbacktype = {
    email: String,
    feedback: String,
    type: 'good' | 'bad'
}
export const postFeedbacks = createAsyncThunk('postfeedback', async (payload: postfeedbacktype) => {
    try {
        console.log(payload);
        const response = await baseURL.post('/api/v1/addfeedback', payload);
        console.log(response);
    }
    catch (err) {
        console.log(err)
    }
})

//getdonation
export const getDonationData = createAsyncThunk('getDonationdata', async () => {
    try {
        const response = await baseURL.get('/api/v1/donationdata')
        return response.data;
    }
    catch (err) {
        console.log(err)
    }
})

export const postDonation = createAsyncThunk('postdonationdata', async (donation: donationType) => {
    console.log("don")
    try {
        const response = await baseURL.post('/api/v1/donationdata', donation)
        console.log(response);
    }
    catch (err) {
        console.log(err)
    }
})

//send mail
export const sendMail = createAsyncThunk('sendmail', async (value: mailsendtype) => {
    try {
        const response = await baseURL.post('/api/v1/sendmail', {
            email: value.mail,
            status: value.type,
            reply: value.reply ? value.reply : ''
        });
    }
    catch (err) {
        console.log(err)
    }
})
