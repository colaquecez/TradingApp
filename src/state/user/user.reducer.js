import {
    ACTION_REQUEST_MY_ADVERTISEMENT,
    ACTION_CHANGE_ID_CHAT,
    ACTION_CREATE_PRODUCT
}
    from './user.action'

const initialState = {
    MyAdvertisement: [],
    chatUserId: [],
    addProduct: [],
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_REQUEST_MY_ADVERTISEMENT:
            return {
                MyAdvertisement: action.payload
            }
        case ACTION_CHANGE_ID_CHAT:
        return {
            chatUserId: action.payload
        }
        case ACTION_CREATE_PRODUCT:
        return {
            addProduct: action.payload
        }
        default:
            return state
    }

}