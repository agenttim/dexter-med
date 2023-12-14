import {combineReducers, createStore} from "redux";
import {medicalDocumentReducer} from "./reducers/medicalDocumentReducer";
import {navigationReducer} from "./reducers/navigationReducer";
import {authReducer} from "./reducers/authReducer";

const rootReducer = combineReducers({
    medicalDocuments: medicalDocumentReducer,
    navigation: navigationReducer,
    auth: authReducer
})

export default createStore(rootReducer)