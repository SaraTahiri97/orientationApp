import * as actions from '../actions/actionTypes';
const initState = {
    userProfile: {},
    errMessage: '',
    message: '',
    token: '',
    code: '',
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    islogout: false,
    isLoadingF: true,
    isRejectedF: false,
    isFulfilledF: false,
}

const users = (state = initState, action) => {
    switch (action.type) {
        /**********LOGIN ACTIONS**********/
        case actions.LOGIN_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false
            }
        case actions.LOGIN_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.LOGIN_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                token: action.payload.data.token
            }
        /**********FORGOT PASSWORD ACTIONS**********/
        case actions.FORGOT_PASSWORD_PENDING:
            return {
                ...state,
                isLoadingF: true,
                isRejectedF: false,
                isFulfilledF: false,
                islogout: false
            }
        case actions.FORGOT_PASSWORD_REJECTED:
            return {
                ...state,
                isLoadingF: false,
                isRejectedF: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.FORGOT_PASSWORD_FULFILLED:
            return {
                ...state,
                isLoadingF: false,
                isFulfilledF: true,
                islogout: false,
                code: action.payload.data.data
            }
        /**********FORGOT PASSWORD ACTIONS**********/
        case actions.RESET_PASSWORD_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false
            }
        case actions.RESET_PASSWORD_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.RESET_PASSWORD_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
            }
        /***************LOG OUT ***************/
        case actions.LOG_OUT:
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: false,
                islogout: true
            }
        case actions.LOG_OUT_FULLFILED:
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: false,
                islogout: false
            }
        /*******REGESTRATION ACTIONS**********/

        case actions.REGISTER_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false

            }
        case actions.REGISTER_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.REGISTER_FULFILLED:


            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                token: action.payload.data.data.token,
                code : action.payload.data.data.codeVerification
            }

        /*************GET PROFILE ACTIONS*************/

        case actions.GET_PROFILE_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false

            }
        case actions.GET_PROFILE_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_PROFILE_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                userProfile: action.payload.data.data
            }
        /*************PASSWORD UPDATE ACTIONS*************/

        case actions.UPDATE_PASSWORD_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false

            }
        case actions.UPDATE_PASSWORD_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_PASSWORD_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
            }

        /*************UPDATE USER ACTIONS*************/

        case actions.UPDATE_USER_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false

            }
        case actions.UPDATE_USER_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_USER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                userProfile: action.payload.data.data

            }
        /*************UPDATE USER TOKEN ACTIONS*************/

        case actions.UPDATE_USER_NOTI_TOKEN_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                islogout: false

            }
        case actions.UPDATE_USER_NOTI_TOKEN_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                islogout: false,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_USER_NOTI_TOKEN_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                notif_token: action.payload.data.data

            }
        default:
            return state
    }
}

export default users