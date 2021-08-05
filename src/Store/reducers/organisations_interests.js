import * as actions from '../actions/actionTypes';

const initState = {
    bourses: [],
    concours: [],
    autres:[],
    orgsAndCountries: [],
    errMessage: '',
    message: '',
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    Boursechecked: false,
    Concourschecked: false,
    Autreschecked:false,

}

const setBoursechecked = (state, action) => {
    return {
        ...state,
        Boursechecked: action.Boursechecked
    }
}
const setConcourschecked = (state, action) => {
    return {
        ...state,
        Concourschecked: action.Concourschecked
    }
}
const setAutreschecked = (state, action) => {
    return {
        ...state,
        Autreschecked: action.Autreschecked
    }
}

const onBourseBtnClick = (state, action) => {

    let bourses = [...state.bourses];
    let updatedBourses = bourses.map((SelectedItem) =>
        SelectedItem.id === action.id
            ? { ...SelectedItem, ischosen: !action.ischosen }
            : { ...SelectedItem },

    );
    let check = false
    updatedBourses.forEach(el => {
        if (el.ischosen) {
            check = true
        }
    });
    return {
        ...state,
        bourses: updatedBourses,
        Boursechecked: check

    }
}

const onConcoursBtnClick = (state, action) => {
  //  console.log('FROM REDUCER ISCHOSEN' + action.ischosen)
    let concours = [...state.concours];
    let updatedConcours = concours.map((SelectedItem) =>
        SelectedItem.id === action.id
            ? { ...SelectedItem, ischosen: !action.ischosen }
            : { ...SelectedItem },

    );
    let check = false
    updatedConcours.forEach(el => {
        if (el.ischosen) {
            check = true
        }
    });

    return {
        ...state,
        concours: updatedConcours,
        Concourschecked: check
    }
}
const onAutresBtnClick = (state, action) => {
    console.log('FROM REDUCER ISCHOSEN' + action.ischosen)
    let autres = [...state.autres];
    let updatedAutres = autres.map((SelectedItem) =>
        SelectedItem.id === action.id
            ? { ...SelectedItem, ischosen: !action.ischosen }
            : { ...SelectedItem },

    );
    let check = false
    updatedAutres.forEach(el => {
        if (el.ischosen) {
            check = true
        }
    });

    return {
        ...state,
        autres: updatedAutres,
        Autreschecked: check
    }
}


const organisations_interests = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_TAGS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case actions.GGET_TAGS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_TAGS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                concours: action.payload.data.data.concours,
                bourses: action.payload.data.data.bourses,
                autres:action.payload.data.data.autres
            }
        case actions.GET_ORGANISATION_COUNTRIES_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case actions.GET_ORGANISATION_COUNTRIES_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_ORGANISATION_COUNTRIES_FULFILLED:

            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                orgsAndCountries: action.payload.data.data,

            }
        case actions.CHECK_BOURSE:
            return setBoursechecked(state, action);
        case actions.CHECK_CONCOURS:
            return setConcourschecked(state, action);
        case actions.CHECK_AUTRES:
            return setAutreschecked(state, action);
        case actions.SELECETED_BOURSE:
            return onBourseBtnClick(state, action);
        case actions.SELECETED_CONCOURS:
            return onConcoursBtnClick(state, action);
        case actions.SELECETED_AUTRES:
            return onAutresBtnClick(state, action);

        case actions.GET_ORGANISATION_BY_USERID_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case actions.GET_ORGANISATION_BY_USERID_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.GET_ORGANISATION_BY_USERID_FULFILLED:
            
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                concours: action.payload.data.data.concours,
                bourses: action.payload.data.data.bourses,
                autres:action.payload.data.data.autres,
                Concourschecked: action.payload.data.data.Concourschecked,
                Boursechecked: action.payload.data.data.Boursechecked,
                Autreschecked: action.payload.data.data.Autreschecked,
            }

        case actions.UPDATE_INTERESTS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case actions.UPDATE_INTERESTS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }
        case actions.UPDATE_INTERESTS_FULFILLED:
            
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        default:
            return state
    }
}

export default organisations_interests