import React from 'react'
import {connect} from 'react-redux'
import {Panel, PanelHeaderBack, PanelHeader, Group, Div, Separator, Button, FixedLayout, Placeholder} from '@vkontakte/vkui'
import Icon16Play from '@vkontakte/icons/dist/16/play';
import Icon28HeadphonesOutline from '@vkontakte/icons/dist/28/headphones_outline';

import './PodcastPreview.css'
import {goBack, setPage} from '../../store/router/actions'


class PodcastPreview extends React.Component {
  state = {
    podcast: this.props.podcast,
    audio: this.props.audio,
  }

  render() {
    const {id, goBack, setPage} = this.props
    const timecodes = this.props.timecodes.map((el, key) => {
      return (
        <div className="Preview__timecodeLine">
          <a href="#">{el.time}</a> — {el.title}
        </div>
      )
    })
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
          Новый подкаст
        </PanelHeader>

        <Div style={{paddingTop: 15, paddingBottom: 64}}>
          <Group separator="hide">
            <div className="Preview__snippet">
              <div className="Preview__snippet__cover" style={{backgroundImage: `url(${this.state.podcast.cover})`}}>
                <div className="Preview__snippet__cover__icon">
                  <Icon16Play fill="#fff"/>
                </div>
              </div>
              <div className="Preview__snippet__info">
                <div className="Preview__snippet__info__title">
                  {this.state.podcast.title}
                </div>
                <div className="Preview__snippet__info__group"><a href="#">Сообщество “ПараDogs”</a></div>
                <div className="Preview__snippet__info__duration">
                  Длительность: {this.state.audio.duration}
                </div>
              </div>
            </div>
            <Separator style={{margin: "15px 0"}}/>
          </Group>
          <Group separator="hide">
            <div className="Preview__description">
              <h4 className="Preview__sectionTitle">Описание:</h4>
              <p>{this.state.podcast.description}</p>
            </div>
            <Separator style={{margin: "15px 0"}}/>
          </Group>
          <Group separator="hide">
            <div className="Preview__description">
              <h4 className="Preview__sectionTitle">Таймкоды:</h4>
              {
                this.props.timecodes.length === 0
                  ? <Placeholder
                      icon={<Icon28HeadphonesOutline width={48} height={48} />}
                      header="Таймкоды не размечены"
                    >
                      Вернитесь к редактированию аудио, чтобы добавить таймкоды к подкасту
                    </Placeholder>
                  : timecodes
              }
            </div>
          </Group>
        </Div>
        <FixedLayout filled vertical="bottom">
          <Div>
            <Button
              size="xl"
              onClick={() => {setPage('podcast', 'added')}}
            >
              Опубликовать подкаст
            </Button>
          </Div>
        </FixedLayout>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  podcast: state.podcast,
  audio: state.audio,
  timecodes: state.timecode,
})

export default connect(mapStateToProps, {goBack, setPage})(PodcastPreview)
