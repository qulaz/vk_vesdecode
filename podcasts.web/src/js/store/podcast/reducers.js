import {SET_AVAILABLE, SET_PODCAST_COVER, SET_PODCAST_INFO} from './actionTypes'

const initialState = {
  title: '',
  cover: null,
  description: '',
  isExplicit: false,
  isExclude: false,
  isTrailer: false,
  available: 'Всем пользователям',
};

export const podcastInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PODCAST_INFO: {
      return {
        ...state,
        ...action.payload
      };
    }

    case SET_PODCAST_COVER: {
      return {
        ...state,
        ...action.payload
      }
    }

    case SET_AVAILABLE: {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      return state;
    }
  }
};
