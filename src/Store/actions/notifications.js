import Axios from 'axios'
import { URL } from '../../config'
import * as ActionTypes from './actionTypes';




export const insertNotification = (data) => {
    return {
        action: ActionTypes.SET_NOTIFICATION,
        payload: Axios.post(`${URL}/notifications/`, data)

    }
}

export const getAllNotification = (iduser) => {
    return {
        type: ActionTypes.GET_NOTIFICATION,
        payload: Axios.get(`${URL}/notifications/${iduser}`)
    }
}

export const updateNotification = (id) => {
    return {
        type: ActionTypes.UPDATE_NOTIFICATION,
        id: id,
        payload: Axios.post(`${URL}/notifications/update/${id}`,)
    }
}
