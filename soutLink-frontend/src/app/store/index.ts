import { ActionReducerMap } from "@ngrx/store";
import {layoutReducer, LayoutState} from "./layout/layout-reducers";



export interface RootReducerState {
    layout: LayoutState,

}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,

}