import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { goBack, closeModal } from "./js/store/router/actions";
import { getActivePanel } from "./js/services/_functions";
import * as VK from "./js/services/VK";

import { View, Root, ModalRoot, ConfigProvider } from "@vkontakte/vkui";

import HomePanel from "./js/panels/Home";
import { PodcastCreate } from "./js/panels/podcasts";
import PodcastSelectViewMode from './js/panels/podcasts/PodcastSelectViewMode'
import PodcastPreview from './js/panels/podcasts/PodcastPreview'
import PodcastAdded from './js/panels/podcasts/PodcastAdded'
import PodcastEdit from './js/panels/podcasts/PodcastEdit'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.lastAndroidBackAction = 0;
  }

  componentDidMount() {
    const { goBack, dispatch } = this.props;

    dispatch(VK.initApp());

    window.onpopstate = () => {
      let timeNow = +new Date();

      if (timeNow - this.lastAndroidBackAction > 500) {
        this.lastAndroidBackAction = timeNow;

        goBack();
      } else {
        window.history.pushState(null, null);
      }
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { activeView, activeStory, activePanel, scrollPosition } = this.props;

    if (
      prevProps.activeView !== activeView ||
      prevProps.activePanel !== activePanel ||
      prevProps.activeStory !== activeStory
    ) {
      let pageScrollPosition =
        scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

      window.scroll(0, pageScrollPosition);
    }
  }

  render() {
    const {
      goBack,
      closeModal,
      popouts,
      activeView,
      activeModals,
      panelsHistory,
      colorScheme,
    } = this.props;

    let history =
      panelsHistory[activeView] === undefined
        ? [activeView]
        : panelsHistory[activeView];
    let popout = popouts[activeView] === undefined ? null : popouts[activeView];
    let activeModal =
      activeModals[activeView] === undefined ? null : activeModals[activeView];

    const podcastModals = (
        <ModalRoot activeModal={activeModal}>
          <PodcastSelectViewMode id="PODCAST_SELECT_VIEW_MODE" onClose={() => closeModal()} />
        </ModalRoot>
    );

    return (
      <ConfigProvider isWebView={true} scheme={colorScheme}>
        <Root activeView={activeView} popout={popout}>
          <View
            id="home"
            activePanel={getActivePanel("home")}
            history={history}
            onSwipeBack={() => goBack()}
          >
            <HomePanel id="base" />
          </View>

          <View
            id="podcast"
            activePanel={getActivePanel("podcast")}
            history={history}
            onSwipeBack={() => goBack()}
            modal={podcastModals}
          >
            <PodcastCreate id="create" />
            <PodcastPreview id="preview" />
            <PodcastAdded id="added" />
            <PodcastEdit id="edit" />
          </View>
        </Root>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeView: state.router.activeView,
    activeStory: state.router.activeStory,
    panelsHistory: state.router.panelsHistory,
    activeModals: state.router.activeModals,
    popouts: state.router.popouts,
    scrollPosition: state.router.scrollPosition,

    colorScheme: state.vkui.colorScheme,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ goBack, closeModal }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
