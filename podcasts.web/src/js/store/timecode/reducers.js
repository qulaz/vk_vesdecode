import {SET_TIMECODE, SORT_TIMECODES} from './actionTypes'

const initialState = [];

export const timecodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMECODE: {
      return [...action.payload];
    }
    case SORT_TIMECODES: {
      console.log([...state].sort((x, y) => x.time - y.time))
      return [...state].sort((x, y) => x.time - y.time);
    }
    default: {
      return state;
    }
  }
};
