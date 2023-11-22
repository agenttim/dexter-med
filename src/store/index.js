import {combineReducers, createStore} from "redux";
import {medicalDocumentReducer} from "./reducers/medicalDocumentReducer";
import {navigationReducer} from "./reducers/navigationReducer";

const rootReducer = combineReducers({
    medicalDocuments: medicalDocumentReducer,
    navigation: navigationReducer

})

export default createStore(rootReducer)