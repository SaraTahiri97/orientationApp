import Axios from 'axios'
import { URL } from '../../config'
import * as ActionTypes from './actionTypes';




export const insertDefultPermission = (userId) => {
    const data = {
        "userId":userId,
        "langue":'Français',
        "notifApp":true,
        "artRec":true,
        "prom":false,
        "derNouv": true
    }
    return {
        action : ActionTypes.SET_PERMISSIONS,
        payload:Axios.post(`${URL}/permissions/`,data)

    }
}

export const getAllPermissionsByUserId = (iduser) => {
    return {
        type: ActionTypes.GET_PERMISSIONS,
        payload: Axios.get(`${URL}/permissions/${iduser}`)
    }
}

export const checkPermission = (id, name, isChecked) => {
    return {
        type: ActionTypes.CHECK_PERMISSION,
        id: id,
        name: name,
        isChecked: isChecked,
    };
};
export const updatePermissions = (PermissionId,permissions) => {
    return {
        type: ActionTypes.UPDATE_PERMISSIONS,
        payload:Axios.post(`${URL}/permissions/update/${PermissionId}`,permissions)
    }
}
export const selectLanguage = (name,selected,permissionId) => {
    const data={name :name}
    return {
        type: ActionTypes.SELECT_LANGUAGE,
        name: name,
        selected:selected,
        payload:Axios.post(`${URL}/permissions/updateLanguage/${permissionId}`,data)


    }
}
