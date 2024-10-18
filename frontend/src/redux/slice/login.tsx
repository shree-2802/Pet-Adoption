import { createSlice } from "@reduxjs/toolkit";
import { getFeedbacks, getPetsData, getUsers } from "../actions";

export type userType = {
  userid: String,
  email: string,
  password: string;
  name: string;
  phone: number | null;
  role: String;
};

export type feedbackType = {
  userid: String,
  email: String,
  feedback: String,
  type: "good" | "bad"
}

export type petsDataType = {
  petid: string,
  pet_name: string,
  breed_name: string,
  age: number,
  profile_image: string,
  Seller: string,
  User: string,
  description: string,
  price:number
}

export type userSliceType = {
  state: {
    isFetching: boolean;
  };
  users: userType[];
  loggedInUser: userType;
  feedbacks: feedbackType[];
  petsdata: petsDataType[]
};

const initialState: userSliceType = {
  state: {
    isFetching: false,
  },
  users: [],
  loggedInUser: {} as userType,
  feedbacks: [] as feedbackType[],
  petsdata: [] as petsDataType[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    checkUser: (state, payload) => {
      console.log(payload);
    },
    setuser: (state, { payload }) => {
      let userLog: userType = {} as userType;
      state.users.forEach(user => {
        if (user.email === payload) {
          userLog = user;
        }
      })
      state.loggedInUser = userLog;
    },
    logoutuser: (state) => {
      state.loggedInUser = {
        userid: '',
        name: "",
        email: "",
        password: "",
        role: "",
        phone: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(getFeedbacks.fulfilled, (state, { payload }) => {
        state.feedbacks = payload;
      })
      .addCase(getPetsData.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.petsdata = payload;
      })
  }
});

export const { setIsFetching, checkUser, setuser, logoutuser } = userSlice.actions;

export default userSlice.reducer;
