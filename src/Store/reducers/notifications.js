import * as actions from '../actions/actionTypes';
const initState = {
    notification: {},
    notificationList: [],
    errMessage: '',
    message: '',
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const notifications = (state = initState, action) => {

    switch (action.type) {
        case actions.SET_NOTIFICATION_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case actions.SET_NOTIFICATION_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.SET_NOTIFICATION_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                notification: action.payload.data.data
            }
        case actions.GET_NOTIFICATION_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case actions.GET_NOTIFICATION_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_NOTIFICATION_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                notificationList: action.payload.data.data
            }

        case actions.UPDATE_NOTIFICATION_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case actions.UPDATE_NOTIFICATION_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_NOTIFICATION_FULFILLED:
            let resp = action.payload.data.data[0]
            let notifs = [...state.notificationList]
            let isNotfound = true
            let updatedNotifications = []
            let update =[]
            let reslt =[] 
            if (notifs.length>0) {
                notifs.forEach(el => {
                    el.notifications.forEach(isSelectedItem => {
                        if (isSelectedItem.id == resp.id) {
                            isNotfound=false
                            isSelectedItem.isSeen = 1
                        }
                       
                    })
    
                     el.notifications.reverse()
                    updatedNotifications.push(el)
                });
                if (isNotfound == true) {
                     updatedNotifications.forEach(el => {
                        if (el.date == resp.created.substring(0, 10)) {
                            resp.isSeen = 1
                            el.notifications.push(resp)
                        }
                        update.push(el)
    
                    })
                }
                
                update.length>0 ?reslt= update:reslt=updatedNotifications
            }
            else{
               let data ={
                    date : resp.created.substring(0, 10),
                    notifications:[resp],
                    heading: "Aujourd'hui"
                }
                reslt.push(data)
            }
           
          
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                notificationList: reslt.reverse()
            }
        default:
            return state
    }
}

export default notifications