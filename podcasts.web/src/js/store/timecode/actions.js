import {SET_TIMECODE, SORT_TIMECODES} from './actionTypes'

export const setTimecodes = (arr) => ({
  type: SET_TIMECODE,
  payload: arr,
});

export const sortTimecodes = () => ({
  type: SORT_TIMECODES,
  payload: null,
});
