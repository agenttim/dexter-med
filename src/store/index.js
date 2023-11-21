import {combineReducers, createStore} from "redux";
import {medicalDocumentReducer} from "./reducers/medicalDocumentReducer";

const rootReducer = combineReducers({
    medicalDocuments: medicalDocumentReducer
})

export default createStore(rootReducer)