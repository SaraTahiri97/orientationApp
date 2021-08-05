
import * as actions from '../actions/actionTypes';



const initialState = {
    newAnouncement: {},
    Announcement: [],
    errMessage: '',
    message: '',
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    isSearchLoading: false,
    isSearchRejected: false,
    isSearchFulfilled: false,
    not_enough_data: false,
    no_data_found: false,
    isSearchPage: false,
    feed: [],
    dataList: [],
    searchedList: [],
    finalResult: [],
    selectedItem: 4,
    bookmarkedC: [],
    bookmarkedB: [],
    bookmarkedE: [],


    tags: [
        {
            id: 4,
            tag: 'Tout'
        },
        {
            id: 1,
            tag: 'Concours'
        },
        {
            id: 2,
            tag: 'Bourses'
        },
        {
            id: 3,
            tag: 'Événements'
        },
    ],


}

const filterdrecommenedList = (array, el) => {
    let list = []
    array.forEach(element => {
        if (element.id != el.id) {
            list.push(element)
        }

    });
    return list
}

const getALLAnnouncements = (state, feed,action) => {

    let not_enough_data = false; let no_data_found = false; let dataList = []; let feedList = []
    if (feed.length != 0) {
        if (feed.length <= 3) {
            feedList = feed; not_enough_data = true; no_data_found = false
        }
        else if (feed.length >= 4) {
            dataList = feed.slice(0, 3); feedList = feed.slice(3); not_enough_data = false; no_data_found = false
        }
    }
    else no_data_found = true
    return {
        ...state,
        feed: feed,
        dataList: dataList,
        finalResult: feedList,
        not_enough_data: not_enough_data,
        no_data_found: no_data_found,
        selectedItem: action.id


    }
}
const displayCorrespondedFeeds = (state, action) => {

    let feed = [...state.feed];
    let list = []
    let feedList = []
    let dataList = []
    let not_enough_data = false
    let no_data_found = false;
    if (action.id == 4) {
        return getALLAnnouncements(state, feed,action)
    }
    else {
        feed.map((item) => {
            if (item.idType === action.id)
                list.push(item)
        })

        if (list.length != 0) {
            if (list.length <= 3) {
                feedList = list
                not_enough_data = true
            }
            else if (list.length >= 4) {
                dataList = list.slice(0, 3)
                feedList = list.slice(3)
                not_enough_data = false

            }
        }
        else {

            no_data_found = true
        }


        return {
            ...state,
            feed: feed,
            dataList: dataList,
            finalResult: feedList,
            not_enough_data: not_enough_data,
            no_data_found: no_data_found,
            selectedItem: action.id
        }
    }

}

const getAnnouncements = (state, feed, recommened) => {
    let not_enough_data = false; let no_data_found = false; let dataList = []; let feedList = []; let purefeedList = [];
    let compeletefeedRecom = []
    if (feed.length != 0) {
        if (feed.length <= 3) {
            feedList = feed; not_enough_data = true; no_data_found = false;
        }
        else if (feed.length >= 4) {
            dataList = feed.slice(0, 3); feedList = feed.slice(3)
                ; not_enough_data = false; no_data_found = false;
        }
    }
    else no_data_found = true
    feedList.forEach(el => {
        el.isRecommened = false
        purefeedList.push(el)
    })
    if (dataList.length != 0) {
        dataList.forEach(el => {
            el.isRecommened = false
            compeletefeedRecom.push(el)
        })
    }

    // handle the recomandation

    let random = {}
    let finalResult = []
    if (recommened.length !== 0) {

        if (purefeedList.length < 3) {
            purefeedList.forEach(el => { el.isRecommened = false })
            random = recommened[Math.floor(Math.random() * (recommened.length))]
            random.isRecommened = true
            purefeedList.push(random)
            finalResult = purefeedList

        }
        else {
            for (let i = 0; i < purefeedList.length; i++) {
                if (i % 4 == 0) {
                    if (recommened.length > 0) {
                        random = recommened[Math.floor(Math.random() * (recommened.length))]
                        random.isRecommened = true
                        finalResult.push(random)
                        recommened = filterdrecommenedList(recommened, random)

                    }
                    purefeedList[i].isRecommened = false
                    finalResult.push(purefeedList[i])

                }
                else {
                    purefeedList[i].isRecommened = false
                    finalResult.push(purefeedList[i])

                }
            }
        }

        finalResult.forEach(el => { compeletefeedRecom.push(el) })
    }
    else {
        finalResult = purefeedList
        finalResult.forEach(el => { compeletefeedRecom.push(el) })

    }


    // alert('HI '+finalResult.length)



    return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        feed: compeletefeedRecom,
        dataList: dataList,
        finalResult: finalResult,
        //feedList: feedList,
        not_enough_data: not_enough_data,
        no_data_found: no_data_found,

    }
}

const handleBookMark = (state, action) => {
    let fr = [...state.finalResult]
    let dl = [...state.dataList]
    let sl =[...state.searchedList]
    let updatedR = fr.map(el =>
        el.id === action.id
            ? { ...el, bookmarked: action.bookmarked == 0 ? 1 : 0 }
            : { ...el },
    )
    let updatedD = dl.map(el =>
        el.id === action.id
            ? { ...el, bookmarked: action.bookmarked == 0 ? 1 : 0 }
            : { ...el },
    )
    let updatedS = sl.map(el =>
        el.id === action.id
            ? { ...el, bookmarked: action.bookmarked == 0 ? 1 : 0 }
            : { ...el },
    )

    let newFeed = [...state.feed]
    let feedup = newFeed.map(el =>
        el.id === action.id
            ? { ...el, bookmarked: action.bookmarked == 0 ? 1 : 0 }
            : { ...el },
    )


    // alert(JSON.stringify(updatedR))
    return {
        ...state,
        feed: feedup,
        dataList: updatedD,
        finalResult: updatedR,
        searchedList:updatedS
    }




}


const announcements = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ANNOUNCEMENTS_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }

        case actions.GET_ANNOUNCEMENTS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message
            }

        case actions.GET_ANNOUNCEMENTS_FULFILLED:
            let feed = action.payload.data.data.ListOfAnnoces;
            let recommened = action.payload.data.data.RecommendedArticles
            return getAnnouncements(state, feed, recommened)

        case actions.FIND_FEEDS_BY_TAG_NAME:
            return displayCorrespondedFeeds(state, action);

        case actions.GET_SEARCHED_ANNOUNCEMENTS_PENDING:
            return {
                ...state,
                isSearchLoading: true,
                isSearchRejected: false,
                isSearchFulfilled: false,
                isSearchPage: true

            }
        case actions.GET_SEARCHED_ANNOUNCEMENTS_REJECTED:
            return {
                ...state,
                isSearchLoading: false,
                isSearchRejected: true,
                isSearchFulfilled: false,
                errMessage: action.payload.response.data.message,
                isSearchPage: true

            }
        case actions.GET_SEARCHED_ANNOUNCEMENTS_FULFILLED:
            return {
                ...state,
                isSearchLoading: false,
                isSearchRejected: false,
                isSearchFulfilled: true,
                searchedList: action.payload.data.data,
                isSearchPage: true
            }
        case actions.SET_ANNOUCEMENT_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false

            }
        case actions.SET_ANNOUCEMENT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message

            }
        case actions.SET_ANNOUCEMENT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                newAnouncement: action.payload.data.data

            }
        case actions.GET_ANNOUNCEMENT_BY_ID_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false

            }
        case actions.GET_ANNOUNCEMENT_BY_ID_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message

            }
        case actions.GET_ANNOUNCEMENT_BY_ID_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                Announcement: action.payload.data.data

            }

        case actions.HANDLE_BOOKMARK_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false

            }
        case actions.HANDLE_BOOKMARK_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message

            }
        case actions.HANDLE_BOOKMARK_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        case actions.CKECK_BOOKMARK:
            return handleBookMark(state, action)

        case actions.GET_BOOKEMARKED_PENDING:
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false

            }
        case actions.GET_BOOKEMARKED_REJECTED:
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                errMessage: action.payload.response.data.message

            }
        case actions.GET_BOOKEMARKED_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookmarkedC: action.payload.data.data.bookmarkedC,
                bookmarkedB: action.payload.data.data.bookmarkedB,
                bookmarkedE: action.payload.data.data.bookmarkedE,
            }
        default:
            return state;
    }
}



export default announcements;