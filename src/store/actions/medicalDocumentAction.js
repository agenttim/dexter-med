import {FETCH_MED_DOC_FAILURE, FETCH_MED_DOC_REQUEST, FETCH_MED_DOC_SUCCESS} from "../types";

export const fetchMedDocRequest = () => ({
    type: FETCH_MED_DOC_REQUEST
})

export const fetchMedDocSuccess = (medDoc) => ({
    type: FETCH_MED_DOC_SUCCESS,
    payload: medDoc
})

export const fetchMedDocFailure = (err) => ({
    type: FETCH_MED_DOC_FAILURE,
    payload: err
})