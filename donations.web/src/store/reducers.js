import { combineReducers } from 'redux'
import {
  CLEAR_CURRENT_DONATION,
  SET_AUTHOR,
  SET_GENERAL_FIELDS,
  SET_GOAL_COMPLETION,
  SET_PHOTO, SET_POST_TEXT,
  SET_PROGRESS
} from './types'


const initialState = {
  bills: [
    { id: 1, title: "Счет VK Pay · 1234" },
    { id: 2, title: "Счет VK Pay · 5678" }
  ],
  authors: [
    { id: 1, name: "Матвей Правосудов" },
  ],
  currentDonut: {
    // 'goal'/'regular'
    type: null,
    photo: null,
    title: "",
    sum: "",
    goal: "",
    description: "",
    billID: 1,
    authorID: 1,
    goalCompletion: {
      //'date'/'collected'
      completionCondition: "",
      // if completionCondition === 'date'
      completionDate: ""
    },
    progress: 1225,
    postText: "Сейчас самое время помочь тем, кто не может попросить о помощи сам."
  }
}

export const donationsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_PHOTO:
      newState = {...state}
      newState.currentDonut.photo = action.value
      return newState
    case CLEAR_CURRENT_DONATION:
      newState = {...state}
      newState.currentDonut = initialState.currentDonut
      return newState
    case SET_PROGRESS:
      newState = {...state}
      newState.currentDonut.progress = action.value
      return newState
    case SET_GENERAL_FIELDS:
      newState = {...state}
      newState.currentDonut = {...newState.currentDonut, ...action.value}
      return newState
    case SET_AUTHOR:
      newState = {...state}
      newState.currentDonut.authorID = action.value
      return newState
    case SET_GOAL_COMPLETION:
      newState = {...state}
      newState.currentDonut.goalCompletion = action.value
      return newState
    case SET_POST_TEXT:
      newState = {...state}
      newState.currentDonut.postText = action.value
      return newState
    default: return state
  }
}


export const rootReducer = combineReducers({
  donations: donationsReducer
})
