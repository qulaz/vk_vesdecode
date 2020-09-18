import bridge from "@vkontakte/vk-bridge";

import { setColorScheme } from "../store/vk/actions";

export const initApp = () => (dispatch) => {
  const VKBridgeCallback = (e) => {
    if (e.detail.type === "VKWebAppUpdateConfig") {
      bridge.unsubscribe(VKBridgeCallback);

      dispatch(setColorScheme(e.detail.data.scheme));
    }
  };

  bridge.subscribe(VKBridgeCallback);
  return bridge
    .send("VKWebAppInit", {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const closeApp = () => {
  return bridge
    .send("VKWebAppClose", {
      status: "success",
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const swipeBackOn = () => {
  return bridge
    .send("VKWebAppEnableSwipeBack", {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const swipeBackOff = () => {
  return bridge
    .send("VKWebAppDisableSwipeBack", {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
