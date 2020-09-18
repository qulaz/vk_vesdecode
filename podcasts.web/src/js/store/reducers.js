import { combineReducers } from "redux";
import { routerReducer } from "./router/reducers";
import { vkuiReducer } from "./vk/reducers";
import { formDataReducer } from "./formData/reducers";
import { podcastInfoReducer } from "./podcast/reducers";
import { audioReducer } from "./audio/reducers";
import { timecodeReducer } from "./timecode/reducers";
import { effectReducer } from "./effects/reducers";

export default combineReducers({
  vkui: vkuiReducer,
  router: routerReducer,
  formData: formDataReducer,
  podcast: podcastInfoReducer,
  audio: audioReducer,
  timecode: timecodeReducer,
  effects: effectReducer
});
