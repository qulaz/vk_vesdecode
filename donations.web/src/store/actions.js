import {
  CLEAR_CURRENT_DONATION,
  SET_AUTHOR,
  SET_GENERAL_FIELDS,
  SET_GOAL_COMPLETION,
  SET_PHOTO, SET_POST_TEXT,
  SET_PROGRESS
} from './types'

export function setPhoto(photo) {
  return {
    type: SET_PHOTO,
    value: photo,
  }
}

export function clearCurrentDonation() {
  return {
    type: CLEAR_CURRENT_DONATION
  }
}

export function setProgress(progress) {
  return {
    type: SET_PROGRESS,
    value: progress,
  }
}

export function setGeneralFields({type, title, sum, goal, description, billID}) {
  return {
    type: SET_GENERAL_FIELDS,
    value: {type, title, sum, goal, description, billID},
  }
}

export function setAuthor(authorID) {
  return {
    type: SET_AUTHOR,
    value: authorID
  }
}

export function setGoalCompletion({ completionCondition, completionDate }) {
  return {
    type: SET_GOAL_COMPLETION,
    value: { completionCondition, completionDate }
  }
}

export function setPostText(postText) {
  return {
    type: SET_POST_TEXT,
    value: postText
  }
}
