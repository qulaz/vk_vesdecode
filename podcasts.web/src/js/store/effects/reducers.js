import {CLEAR_FADE_IN, CLEAR_FADE_OUT, SET_FADE_IN, SET_FADE_OUT} from './actionTypes'

const initialState = {
  fadeIn: null,
  fadeOut: null,
  isFadeInRegionCreated: false,
  isFadeOutRegionCreated: false,
};

export const effectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FADE_IN: {
      return {
        ...state,
        fadeIn: action.payload,
        isFadeInRegionCreated: true,
      };
    }
    case SET_FADE_OUT: {
      return {
        ...state,
        fadeOut: action.payload,
        isFadeOutRegionCreated: true,
      };
    }
    case CLEAR_FADE_IN: {
      return {
        ...state,
        fadeIn: null,
        isFadeInRegionCreated: false,
      };
    }
    case CLEAR_FADE_OUT: {
      return {
        ...state,
        fadeOut: null,
        isFadeOutRegionCreated: false,
      };
    }
    default: {
      return state;
    }
  }
};
