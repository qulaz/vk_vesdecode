import React from 'react'
import {connect} from 'react-redux'
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Cell,
  ModalPage,
  ModalPageHeader,
  IOS,
  PanelHeaderButton, Div,
} from '@vkontakte/vkui'

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions'
import {setAudio, setAvailable, setPodcastCover, setPodcastInfo} from '../../store/podcast/actions'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss'


class PodcastSelectViewMode extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.setParam = this.setParam.bind(this)
  }

  state = {
    available: this.props.available
  }

  setParam(value) {
    this.setState({ available: value })
    this.props.setAvailable(value)
    this.props.goBack()
  }

  render() {
    const { id, onClose, platform } = this.props;

    return (
      <ModalPage
        id={id}
        header={
          <ModalPageHeader
            left={
              platform !== IOS && (
                <PanelHeaderButton onClick={onClose}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderButton onClick={onClose}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          >
            Кому доступен данный подкаст
          </ModalPageHeader>
        }
        onClose={onClose}
        settlingHeight={100}
      >
        <Div style={{padding: '0px', paddingBottom: 10}}>
          <Cell
            onClick={() => this.setParam('Всем пользователям')}
            asideContent={this.state.available === 'Всем пользователям' ? <Icon24Done fill="var(--accent)" /> : null}
          >
            Всем пользователям
          </Cell>
          <Cell
            onClick={() => this.setParam('Только мне')}
            asideContent={this.state.available === 'Только мне' ? <Icon24Done fill="var(--accent)" /> : null}
          >
            Только мне
          </Cell>
          <Cell
            onClick={() => this.setParam('Никому')}
            asideContent={this.state.available === 'Никому' ? <Icon24Done fill="var(--accent)" /> : null}
          >
            Никому
          </Cell>
        </Div>
      </ModalPage>
    )
  }
}

const mapStateToProps = state => ({
  available: state.podcast.available,
})
const mapDispatchToProps = {
  goBack,
  setAvailable
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastSelectViewMode)
