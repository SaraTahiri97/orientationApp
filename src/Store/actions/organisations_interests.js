import Axios from 'axios'
import { URL } from '../../config'
import * as ActionTypes from './actionTypes';


export const getOrganisations = () => {
    return {
        type: ActionTypes.GET_ORGANISATION,
        payload: Axios.get(`${URL}/organisation`)
    }
}



export const getOrganisationsByUserId = (userId) => {
    return {
        type: ActionTypes.GET_ORGANISATION_BY_USERID,
        payload: Axios.get(`${URL}/organisation/user/${userId}`)
    }
}

export const getAllOrganisationsANDCountries = () => {
    return {
        type: ActionTypes.GET_ORGANISATION_COUNTRIES,
        payload: Axios.get(`${URL}/organisation/organisations`)
    }
}


export const checkBourse = (Boursechecked) => {
    return {
        type: ActionTypes.CHECK_BOURSE,
        Boursechecked: Boursechecked,
    };
};
export const checkAutres = (Autreschecked) => {
    return {
        type: ActionTypes.CHECK_AUTRES,
        Autreschecked: Autreschecked,
    };
};

export const checkConcours = (Concourschecked) => {
    return {
        type: ActionTypes.CHECK_CONCOURS,
        Concourschecked: Concourschecked,

    };
};

export const selectBourse = (id, name, ischosen) => {
    return {
        type: ActionTypes.SELECETED_BOURSE,
        id: id,
        name: name,
        ischosen: ischosen,
    };
};

export const selectConcours = (id, name, ischosen) => {
    return {
        type: ActionTypes.SELECETED_CONCOURS,
        id: id,
        name: name,
        ischosen: ischosen,
    };
};
export const selectAutres = (id, name, ischosen) => {
    return {
        type: ActionTypes.SELECETED_AUTRES,
        id: id,
        name: name,
        ischosen: ischosen,
    };
};
export const submitInterests = (mail, Listconcours, Listbourses,Listautres) => {

    let data = [{ concours: Listconcours }, { bourses: Listbourses }, {autres:Listautres},{ email: mail }]
    return {
        type: ActionTypes.SUBMIT_INTERESTS,

        payload: Axios.post(`${URL}/organisation/interests`, data)
    };
};
export const updateInterests = (userId, Listconcours, Listbourses,Listautres) => {
    let data = [{ concours: Listconcours }, { bourses: Listbourses }, {autres:Listautres},{ userId: userId }]
    return {
        type: ActionTypes.UPDATE_INTERESTS,

        payload: Axios.post(`${URL}/organisation/interests/update`, data)
    };
};


export const getAllTags = () => {
    return {
        type: ActionTypes.GET_TAGS,
        payload: Axios.get(`${URL}/organisation/getTags`)
    }
}
