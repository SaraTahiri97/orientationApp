import Axios from 'axios'
import { URL } from '../../config'
import * as ActionTypes from './actionTypes';


export const login = (data) => {
    return {
        type: ActionTypes.LOGIN,
        payload: Axios.post(`${URL}/users/login`, data)
    }
}
export const forgotPassword = (email) => {
    const data= {email:email}
    return {
        type: ActionTypes.FORGOT_PASSWORD,
        payload: Axios.post(`${URL}/users/forgotPassword`, data)
    }
}

export const register = (data) => {
    return {
        type: ActionTypes.REGISTER,
        payload: Axios.post(`${URL}/users/register`, data)
    }
}

export const refresh=(fct)=>{
    return{
        type:ActionTypes.LOG_OUT,
        fct : fct
    }
}
export const logoutFullfiled=()=>{
    return{
        type:ActionTypes.LOG_OUT_FULLFILED,
    }
}


export const getProfile = (token) => {
    return {
        type: ActionTypes.GET_PROFILE,
        payload: Axios.get(`${URL}/users/profile`, {
            headers: {
                Authorization: token
            }
        })
    }
}


export const updatePassword = (userId,data) => {
    //alert(JSON.stringify(data))
    return {
        type: ActionTypes.UPDATE_PASSWORD,
        payload:Axios.post(`${URL}/users/password/${userId}`,data)
    }
}
export const ResetPassword = (email,password) => {
    //alert(JSON.stringify(data))
    const data ={email:email, password:password}
    return {
        type: ActionTypes.RESET_PASSWORD,
        payload:Axios.post(`${URL}/users/resetPassword`,data)
    }
}

export const updateUser = (data) => {
    //alert(JSON.stringify(data))
    return {
        type: ActionTypes.UPDATE_USER,
        payload:Axios.post(`${URL}/users/update/user/${data.id}`,data)
    }
}
export const storeNotifToken = (id,token) => {
    //alert(JSON.parse(token))
        return {
        type: ActionTypes.UPDATE_USER_NOTI_TOKEN,
        payload:Axios.post(`${URL}/users/update/user_noti_token/${id}`,token)
    }
}

