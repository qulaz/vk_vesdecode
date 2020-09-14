import React from 'react'
import {Panel, Div, Separator, Progress, Button, Input, Avatar} from '@vkontakte/vkui'
import { connect } from 'react-redux'
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon20ViewOutline from '@vkontakte/icons/dist/20/view_outline';
import Icon16LikeOutline from '@vkontakte/icons/dist/16/like_outline';

import avatarImage from '../img/avatar.png'
import StickyFooter from '../components/StickyFooter'
import {millisecondsToHumanDuration, numberWithSpaces, sleep} from '../utils'
import '../components/StickyFooter.css'
import './DonationView.css'
import DonationProgressBar from '../components/DonationProgressBar'
import {setProgress} from '../store/actions'


class DonationView extends React.Component {
  state = {
    ...this.props.current
  }

  async componentDidMount() {
    const procentage = [0, 0.1, 0.22, 0.44, 0.53, 0.61, 0.724, 0.75, 0.901, 1]
    for (const value of procentage) {
      this.props.setProgress(Math.floor(this.state.sum * value))
      await sleep(1000)
    }
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <div className="DView__cover" style={{backgroundImage: `url(${this.state.photo})`}}/>
        <Div>
          <div className="DView__header">
            <div className="DView__title">{ this.state.title }</div>
            <div className="DView__author">Автор <a href="#">Матвей Правосудин</a></div>
            <div className="DView__type">
              {
                this.state.type === 'goal'
                ? `Сбор закончится ${millisecondsToHumanDuration(new Date(this.state.goalCompletion.completionDate) - new Date())}`
                : "Помощь нужна каждый месяц"
              }
            </div>
          </div>
          <Separator/>
          <DonationProgressBar
            donationType={this.state.type}
            needed={this.state.sum}
            donated={this.props.progress}
            goalEndDate={this.state.goalCompletion.completionDate}
          />
        </Div>
        <Separator style={{paddingTop: 20}}/>
        <Div>
          <div className="DView__description">
            {this.state.description}
          </div>
        </Div>
        <Separator style={{paddingTop: 10}}/>
        <Div>
          <div className="DView__statBox">
            <div className="DView__statBox__left">
              <div className="DView__statBox__icon">
                <Icon24LikeOutline /> <span>65</span>
              </div>
              <div className="DView__statBox__icon">
                <Icon24CommentOutline /> <span>65</span>
              </div>
              <div className="DView__statBox__icon">
                <Icon24ShareOutline /> <span>4</span>
              </div>
            </div>
            <div className="DView__statBox__right">
              <div className="DView__statBox__icon">
                <Icon20ViewOutline /> <span>7,2K</span>
              </div>
            </div>
          </div>
        </Div>
        <Separator wide={true} style={{paddingBottom: 10}}/>
        <Div>
          <div className="DView__comment">
            <div className="DView__comment__body">
              <div className="DView__comment__avatar">
                <Avatar size={36} src={avatarImage} />
              </div>
              <div className="DV__comment__message">
                <div className="name">Алексей Мазелюк <span>5 мин</span></div>
                <div className="message">Отправил.</div>
              </div>
            </div>
            <div className="DView__comment__like">
              <Icon16LikeOutline />
            </div>
          </div>
          <div className="DView__send__comment">
            <div className="DView__send__comment__avatar">
              <Avatar size={36} src={avatarImage} />
            </div>
            <Input type="text" placeholder="Комментарий" />
          </div>
        </Div>
        <StickyFooter>
          <Separator wide={true}/>
          <div className="Snippet__footer Snippet__footer__don_view">
            <div className="Snippet__progress">
              {
                this.state.progress === 0
                  ? <p>Помогите первым</p>
                  : <p>Собрано {numberWithSpaces(this.props.progress)} ₽ из {numberWithSpaces(parseInt(this.state.sum))} ₽</p>
              }
              <Progress
                value={this.props.progress / parseInt(this.state.sum) * 100}
                style={{backgroundColor: "#B8C1CC"}}
              />
            </div>
            <div className="Snippet__action">
              <Button mode="commerce" size="l" disabled={this.props.disabled === true}>Помочь</Button>
            </div>
          </div>
        </StickyFooter>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  current: state.donations.currentDonut,
  progress: state.donations.currentDonut.progress,
})

export default connect(mapStateToProps, { setProgress })(DonationView)
