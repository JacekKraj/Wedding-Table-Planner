import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    editModalRectangularVisible: false,
    newProjectModalVisible: false,
    editModalRoundVisible: false,
    id: null,
    saveCheckModalVisible: false,
    leaveHandler: null,

};

const modalVisibilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_RECTANGULAR_MODAL_VISIBILITY:
            return {
                ...state,
                editModalRectangularVisible: action.visible,
                id: action.id
            }
        case actionTypes.SHOW_NEWPROJECT_MODAL:
            return {
                ...state,
                editModalRoundVisible: false,
                editModalRectangularVisible: false,
                newProjectModalVisible: true
            }
        case actionTypes.HIDE_NEWPROJECT_MODAL:
            return {
                ...state,
                newProjectModalVisible: false
            }
        case actionTypes.EDIT_ROUND_MODAL_VISIBILITY:
            return {
                ...state,
                editModalRoundVisible: action.visible,
                id: action.id
            }
        case actionTypes.EDIT_SAVE_CHECK_MODAL_VISIBILITY:
            return {
                ...state,
                saveCheckModalVisible: action.visible,
                leaveHandler: action.leaveHandler,


            }
        default:
            return state
    }
}

export default modalVisibilityReducer;