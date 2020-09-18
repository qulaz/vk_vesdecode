import {SET_FADE_OUT, SET_FADE_IN, CLEAR_FADE_IN, CLEAR_FADE_OUT} from './actionTypes'

export const setFadeOut = (start, end) => ({
  type: SET_FADE_OUT,
  payload: {
    start, end
  },
});

export const setFadeIn = (start, end) => ({
  type: SET_FADE_IN,
  payload: {
    start, end
  },
});

export const clearFadeIn = () => ({
  type: CLEAR_FADE_IN,
  payload: null,
});

export const clearFadeOut = () => ({
  type: CLEAR_FADE_OUT,
  payload: null,
});
