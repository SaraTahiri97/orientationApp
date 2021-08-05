
import * as actions from '../actions/actionTypes';



const initialState = {

    languages :[
        {
            id: 1,
            flag: require('../../components/images/usaFlag.jpg'),
            language: 'English',
            isSelected: false,
        },
       
        {
            id: 2,
            flag: require('../../components/images/franceFlag.png'),
            language: 'French',
            isSelected: false,
        },
    ],
    selectedLanguage: {
        id: 1,
        flag: require('../../components/images/wings.jpg'),
        language: 'English',
        isSelected: false,
    },
}
const onRadioBtnClick = (state, action) => {
    let languages = [...state.languages];
    let selected ={}
    let updatedlanguages = languages.map((isSelectedItem) =>
        isSelectedItem.id === action.id
            ? { ...isSelectedItem, isSelected: true }
            : { ...isSelectedItem, isSelected: false },
    );
    languages.map((isSelectedItem) => {
        if (isSelectedItem.id === action.id) {
            selected= isSelectedItem
        }
    });
    return {
        ...state,
        languages: updatedlanguages,
        selectedLanguage:selected
    }
}






const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.SELECT_LANGUAGE:
            return onRadioBtnClick(state, action);


        default:
            return state;
    }
}



export default reducer;