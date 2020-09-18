import {SET_PODCAST_INFO, SET_PODCAST_COVER, SET_AVAILABLE} from './actionTypes'

export const setPodcastCover = (cover) => ({
  type: SET_PODCAST_COVER,
  payload: {
    cover: cover,
  },
});

export const setPodcastInfo = (title, description, isExplicit, isExclude, isTrailer) => ({
  type: SET_PODCAST_INFO,
  payload: {
    title, description, isExplicit, isExclude, isTrailer
  },
});

export const setAvailable = (available) => ({
  type: SET_AVAILABLE,
  payload: {
    available
  },
});
