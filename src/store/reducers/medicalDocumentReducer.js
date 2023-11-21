import {FETCH_MED_DOC_FAILURE, FETCH_MED_DOC_REQUEST, FETCH_MED_DOC_SUCCESS} from "../types";

const initialState = {
    documents: [],
    loading: false,
    error: null,
}

export const medicalDocumentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MED_DOC_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_MED_DOC_SUCCESS:
            return {
                ...state,
                loading: false,
                documents: action.payload
            };
        case FETCH_MED_DOC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state
    }
}