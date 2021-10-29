// redux-promiseの利用
import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING":
      return {...state, fetching: true};
    case "FETCH_USERS_REJECTED":
      return {...state,fetching :false, error: action.payload };
    case "FETCH_USERS_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    return state;
  };
}
const middleware = applyMiddleware(promise, createLogger());
const store = createStore(reducer,middleware);

store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://localhost:18080")
});

// redux-logger,redux-thunkの使用--------------------------------------------
// import { applyMiddleware, createStore } from "redux";
// import axios from "axios";
// import { createLogger } from "redux-logger";
// import thunk from "redux-thunk";

// const reducer = (state={}, action) =>{
//   const initialState = {
//     fetching: false,
//     fetched: false,
//     users: [],
//     error: null
//   };
//   const reducer = (state=initialState, action) => {
//     switch (action.type) {
//       case "FETCH_USERS_START":
//         return {...state, fetching: true};
//       case "FETCH_USERS_ERROR":
//         return {...state, fetching: false, error: action.payload };
//       case "RECEIVE_USERS":
//         return {
//           ...state,
//           fetching: false,
//           fetched: true,
//           users: action.payload
//         };
//     }
//   }
//   return state;
// }
// const middleware = applyMiddleware(thunk, createLogger());
// const store = createStore(reducer,middleware);

// store.dispatch((dispatch)=> {
//   dispatch({type: "FETCH_USERS_START"});
//   axios.get("http://localhost:18080")
//     .then((response) =>{
//       dispatch({type: "RECEIVE_USERS",payload: response.data});
//     })
//     .catch((err) => {
//       dispatch({type: "FETCH_USERS_ERROR", payload: err});
//     });
// });


//appryMiddlewareを使用する----------------------------------------

// import { applyMiddleware, createStore } from "redux";

// const reducer = (state = 0, action) => {
//   switch(action.type) {
//     case "INC":
//       state = state + 1;
//       break;
//     case "DEC":
//       state = state - 1;
//       break;
//     case "ERR":
//       throw new Error("It's error!!!");
//   }
//   return state;
// }

// const logger = (store) => (next) => (action) =>{
//   console.log("const logger actionが発火しました", action);
//   next(action);
// }
// const error = (store) => (next) => (action) => {
//   try{
//     next(action);
//   }catch (err) {
//     console.log("Error was occures", err)
//   }
// }

// const miiddleware = applyMiddleware(logger,error);
// const store = createStore(reducer, 1,miiddleware);

// store.subscribe(() => {
//   console.log("store changed", store.getState())
// });

// store.dispatch({type: "INC"});
// store.dispatch({type: "INC"});
// store.dispatch({type: "DEC"});
// store.dispatch({type: "DEC"});
// store.dispatch({type: "ERR"});


// 二度目の形------------------------------------------------------
// import { combineReducers, createStore } from "redux";

// const userReducer = (state = {}, action) => {
//   switch(action.type){
//     case "CHANGE_NAME":
//       // state.name = action.payload;
//       state = {...state, name: action.payload }
//       break;
//     case "CHANGE_AGE":
//       // state.age = action.payload;
//       state = {...state, age: action.payload }
//       break;
//   }
//   return state;
// }

// const tweetsReducer = (state = [], action) => {
//   switch(action.type) {
//     case "ADD_TWEET":
//       state = state.concat({id: Date.now(), text: action.payload });
//   }
//   return state;
// }

// const reducers = combineReducers({
//   user: userReducer,
//   tweets: tweetsReducer
// })

// const store = createStore(reducers);


// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });

// store.dispatch({type: "CHANGE_NAME",payload: "Miura Sho" });
// store.dispatch({type: "CHANGE_AGE", payload: 29});
// store.dispatch({type: "CHANGE_AGE", payload: 100});
// store.dispatch({type: "ADD_TWEET", payload: "初ツイートしました"});
// store.dispatch({type: "ADD_TWEET", payload: "二回目のツイート"});


// 最初の形０１---------------------------------------------------------
// import { createStore } from "redux";

// const reducer = (state = 0 , action) => {
//   console.log("reduserが呼ばれました");
//   switch(action.type) {
//     case "INC":
//       return state + action.payload;
//     case "DEC":
//       return state - action.payload;
//   }
//   return state;
// }

// const store = createStore(reducer, 1);

// store.subscribe(() =>{
//   console.log("storeが変更されました", store.getState());
// });
// store.dispatch({type: "INC", payload: 1});
// store.dispatch({type: "INC", payload: 100});
// store.dispatch({type: "INC", payload: 523523});
// store.dispatch({type: "DEC", payload: 523523});
// store.dispatch({type: "DEC", payload: 53322});
