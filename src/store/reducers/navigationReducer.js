import {Feather} from "@expo/vector-icons";
import {RESET_TAB_SCREEN_DOCUMENTS_OPTIONS, SET_TAB_SCREEN_DOCUMENTS_OPTIONS} from "../types";

const initialStateDocumentsOption = {
    tabScreenOptions: {
        headerShown: true,
        tabBarLabel: "Медкарта",
        headerTitle: "Ваши медицинские документы",
        tabBarIcon: ({color}) => (
            <Feather name="book" size={25} color={color}/>
        )
    }
}

export const navigationReducer = (state = initialStateDocumentsOption, action) => {
    switch (action.type) {
        case SET_TAB_SCREEN_DOCUMENTS_OPTIONS:
            return {
                ...state,
                tabScreenOptions: {
                    ...state.tabScreenOptions,
                    headerShown: false,
                }
            };
        case RESET_TAB_SCREEN_DOCUMENTS_OPTIONS:
            return initialStateDocumentsOption;
        default:
            return state;
    }
}
