import * as actions from '../actions/actionTypes';
const initState = {
    permissions: [],
    userId: '',
    permissionId:'',
    langue: '',
    errMessage: '',
    message: '',
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    languages: [
        {
            id: 1,
            flag: require('../../components/images/usaFlag.jpg'),
            language: 'English',
            isSelected: false,
        },

        {
            id: 2,
            flag: require('../../components/images/franceFlag.png'),
            language: 'Français',
            isSelected: false,
        },
    ],

}
const onToggleSwitch = (state, action) => {
    let noti_permissions = [...state.permissions.notificationSittings];
    let updatedNotifPermission = noti_permissions.map((SelectedItem) =>
        SelectedItem.id === action.id
            ? { ...SelectedItem, isChecked: !action.isChecked }
            : { ...SelectedItem },

    );
    let updatedPermission = {
        userId: state.userId,
        langue: state.langue,
        notificationSittings: updatedNotifPermission
    }
    return {
        ...state,
        permissions: updatedPermission
    }
}
const getObjectByNAME = (state,name) => {
    let languages = [...state.languages];
    let obj={}
    languages.forEach(elm => {
        if (elm.language === name) {
            obj= elm
        }
        
    });
    return obj

}
const onRadioBtnClick = (state, action) => {
    let languages = [...state.languages];
    let selected = ''
   let obj = getObjectByNAME(state,action.name)

    let updatedlanguages = languages.map((isSelectedItem) =>
        isSelectedItem.id === obj.id
            ? { ...isSelectedItem, isSelected: true }
            : { ...isSelectedItem, isSelected: false },
    );
    languages.map((isSelectedItem) => {
        if (isSelectedItem.id === obj.id) {
            selected = isSelectedItem
        }
    });

    return {
        ...state,
        languages: updatedlanguages,
        langue: action.payload.data.data
    }
}

const permissions = (state = initState, action) => {
    switch (action.type) {
        case actions.SET_PERMISSIONS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case actions.SET_PERMISSIONS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.SET_PERMISSIONS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                islogout: false,
                permissions: action.payload.data.data,
            }

        case actions.GET_PERMISSIONS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case actions.GET_PERMISSIONS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_PERMISSIONS_FULFILLED:
            
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                permissions: action.payload.data.data,
                permissionId :action.payload.data.data.permissionId,
                userId: action.payload.data.data.userId,
                langue: action.payload.data.data.langue,

            }

        case actions.CHECK_PERMISSION:
            return onToggleSwitch(state, action);

        case actions.UPDATE_PERMISSIONS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case actions.UPDATE_PERMISSIONS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_PERMISSIONS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        case actions.SELECT_LANGUAGE:
            return onRadioBtnClick(state, action);

        default:
            return state
    }
}

export default permissions