import { configureStore } from "@reduxjs/toolkit";
import { Action } from "redux";
export enum TipAction {
  SHOW,
  HIDE,
  CHANGE,
}

//核心store
export const tipStore = configureStore<boolean, Action<TipAction>>({
  reducer: (state = true, action) => {
    switch (action.type) {
      case TipAction.SHOW:
        return true;
      case TipAction.HIDE:
        return false;
      case TipAction.CHANGE:
        return !state;
      default:
        return false;
    }
  },
});
