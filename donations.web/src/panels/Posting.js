import React from 'react'
import { Panel, PanelHeader, PanelHeaderButton, Div, Group, CardGrid, Card } from '@vkontakte/vkui'
import { IOS, platform } from '@vkontakte/vkui'
import { connect } from 'react-redux'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline'
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline'
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'

import Icon28PostIos from '../img/postIconIos.svg'
import PostingHud from '../img/postHud.png'
import './Posting.css'
import DonationSnippet from '../components/DonationSnippet'
import StickyFooter from '../components/StickyFooter'
import {setPostText} from '../store/actions'


const osName = platform()


class Posting extends React.Component {
  state = {
    ...this.props.current
  }

  textarea = React.createRef()

  post() {
    this.props.setPostText(this.state.postText)
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          right={
            <PanelHeaderButton onClick={(e) => { this.post(); this.props.go(e) }} data-to="feed">
              {osName === IOS ? <img src={Icon28PostIos} style={{"marginRight": "10px"}}/> : <Icon28DoneOutline/>}
            </PanelHeaderButton>
          }
        >
          Матвей
        </PanelHeader>
        <div className="Posting">
          <Div>
            <div
              className="Posting__textarea"
              contentEditable="true"
              ref={this.textarea}
              onBlur={(e) => { this.setState({ postText: e.target.textContent })}}
            >
              { this.state.postText }
            </div>
          </Div>
          <DonationSnippet
            photo={this.state.photo}
            title={this.state.title}
            author="Матвей Правосудов"
            donated={this.state.progress}
            needed={this.state.sum}
            disabled={true}
            goalEndDate={this.state.goalCompletion.completionDate}
            donationType={this.state.type}
          />
        </div>
        <StickyFooter margin={0}>
          <div className="Posting__hud" style={{ backgroundImage: `url(${PostingHud})` }}/>
        </StickyFooter>
      </Panel>
    )
  }
}


const mapStateToProps = state => ({
  authors: state.donations.authors,
  current: state.donations.currentDonut,
})

export default connect(mapStateToProps, { setPostText })(Posting)
