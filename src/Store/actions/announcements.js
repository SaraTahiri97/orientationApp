import Axios from 'axios'
import { URL } from '../../config'
import * as ActionTypes from './actionTypes';


export const getAnnouncementsOfInterests = (iduser) => {
    return {
        type: ActionTypes.GET_ANNOUNCEMENTS,
        payload: Axios.get(`${URL}/announcements/${iduser}`)
    }
}
export const listCorrespondedFeeds = (id, tag) => {
    return {
        type: ActionTypes.FIND_FEEDS_BY_TAG_NAME,
        id: id,
        tag: tag
    };
};
export const getSearchedAnouncements = (search) => {
    return {
        type: ActionTypes.GET_SEARCHED_ANNOUNCEMENTS,
        payload: Axios.get(`${URL}/announcements/?search=${search}`)
    };
}
export const insertAnnoucements = (data) => {
    return {
        type: ActionTypes.SET_ANNOUCEMENT,
        payload: Axios.post(`${URL}/announcements/`, data)
    };
};
export const getAnnouncementById = (id) => {
    return {
        type: ActionTypes.GET_ANNOUNCEMENT_BY_ID,
        payload: Axios.get(`${URL}/announcements/announcement/${id}`, )
    };
};

export const handleBookmark = (idUser, idAnn,bookmarked) => {
    const data ={ idUser:idUser,idAnn:idAnn }
    return {
        type: ActionTypes.HANDLE_BOOKMARK,
        id :idAnn,
        bookmarked:bookmarked,
        payload: Axios.post(`${URL}/announcements/bookmark`, data)
    };
};
export const ckeckBookmark = (idAnn,bookmarked) => {
    
    return {
        type: ActionTypes.CKECK_BOOKMARK,
        id :idAnn,
        bookmarked:bookmarked,
        
    };
};

export const getBookmarkedByUser = (idUser) => {
    return {
        type: ActionTypes.GET_BOOKEMARKED,
        payload: Axios.get(`${URL}/announcements/announcement/getBookmarks/${idUser}`, )
    };
};