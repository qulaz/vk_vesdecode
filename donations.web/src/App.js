import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import ConfigProvider from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider'
import { View } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { connect } from 'react-redux'

import { Home, RegularDonation, GoalDonation, DonationType, GoalDonationAdditional, Posting, Feed, DonationView } from './panels'


class App extends React.Component {
  state = {
    activePanel: window.location.hash === "" ? 'home' : window.location.hash.replace("#", ""),
    history: [window.location.hash === "" ? 'home' : window.location.hash.replace("#", "")]
  }

	go = e => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
    window.location.hash = e.currentTarget.dataset.to
	}

  goBack = () => {
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === 'home') {
      bridge.send('VKWebAppDisableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

  goForward = (activePanel) => {
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === 'home') {
      bridge.send('VKWebAppEnableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

	render() {
    return (
      <ConfigProvider>
        <View activePanel={this.state.activePanel} >
          <Home id='home' go={this.go} />
          <DonationType id='donation_type' go={this.go} />
          <RegularDonation id='regular_donation' go={this.go} />
          <GoalDonation id='goal_donation' go={this.go} />
          <GoalDonationAdditional id='goal_donation_additional' go={this.go} />
          <Posting id='posting' go={this.go} />
          <Feed id='feed' go={this.go} />
          <DonationView id='donation_view' go={this.go} />
        </View>
      </ConfigProvider>
    )
  }
}

export default connect(null, null)(App)