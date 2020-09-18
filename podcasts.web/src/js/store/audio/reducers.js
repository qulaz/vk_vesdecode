import {CLEAR_AUDIO, SET_AUDIO, SET_AUDIO_DURATION} from './actionTypes'

const initialState = {
  file: null,
  name: '',
  duration: ''
};

export const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SET_AUDIO_DURATION: {
      return {
        ...state,
        ...action.payload
      };
    }

    case CLEAR_AUDIO: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};
