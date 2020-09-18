import {CLEAR_AUDIO, SET_AUDIO, SET_AUDIO_DURATION} from './actionTypes'

export const setAudio = (file, name) => ({
  type: SET_AUDIO,
  payload: {
    file, name
  },
});

export const setAudioDuration = (duration) => ({
  type: SET_AUDIO_DURATION,
  payload: {
    duration
  },
});

export const clearAudio = () => ({
  type: CLEAR_AUDIO,
  payload: null,
});
