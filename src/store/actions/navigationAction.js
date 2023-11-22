import {RESET_TAB_SCREEN_DOCUMENTS_OPTIONS, SET_TAB_SCREEN_DOCUMENTS_OPTIONS} from "../types";

export const setTabScreenDocumentsOptions = () => {
    return {
        type: SET_TAB_SCREEN_DOCUMENTS_OPTIONS,
    }
}
export const resetTabScreenDocumentsOptions = () => {
    return {
        type: RESET_TAB_SCREEN_DOCUMENTS_OPTIONS,
    }
}
