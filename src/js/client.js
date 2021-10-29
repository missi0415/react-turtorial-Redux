import { createStore } from "redux";

const reducer = (state = 0 , action) => {
  console.log("reduserが呼ばれました");
  switch(action.type) {
    case "INC":
      return state + action.payload;
    case "DEC":
      return state - action.payload;
  }
  return state;
}

const store = createStore(reducer, 1);

store.subscribe(() =>{
  console.log("storeが変更されました", store.getState());
});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 100});
store.dispatch({type: "INC", payload: 523523});
store.dispatch({type: "DEC", payload: 523523});
store.dispatch({type: "DEC", payload: 53322});
