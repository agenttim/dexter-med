import {combineReducers, createStore} from "redux";
import {medicalDocumentReducer} from "./reducers/medicalDocument";

const rootReducer = combineReducers({
    medicalDocument: medicalDocumentReducer
})

export default createStore(rootReducer)