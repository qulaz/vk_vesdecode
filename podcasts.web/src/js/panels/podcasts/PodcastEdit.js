import React from 'react'
import {connect} from 'react-redux'
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Div,
  Group,
  Header,
  Input,
  Button,
  FixedLayout,
  ScreenSpinner,
} from '@vkontakte/vkui'
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline'
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions'
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Pause from '@vkontakte/icons/dist/28/pause';
import debounce from 'lodash/debounce'


import {closePopout, goBack, openPopout, setPage} from '../../store/router/actions'
import './PodcastEdit.css'
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton'
import Icon24Add from '@vkontakte/icons/dist/24/add'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import {secToDuration} from '../../utils'
import {setTimecodes, sortTimecodes} from '../../store/timecode/actions'
import {clearFadeIn, clearFadeOut, setFadeIn, setFadeOut} from '../../store/effects/actions'
import {setAudioDuration} from '../../store/audio/actions'


class PodcastEdit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.waveformRef = React.createRef()
    this.togglePlay = this.togglePlay.bind(this)
    this.createFadeInRegion = this.createFadeInRegion.bind(this)
    this.createFadeOutRegion = this.createFadeOutRegion.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
  }

  state = {
    podcast: this.props.podcast,
    audio: this.props.audio,
    play: false,
    isFadeInRegionCreated: !!this.props.effects.fadeIn,
    isFadeOutRegionCreated: !!this.props.effects.fadeOut,
    effects: {...this.props.effects},
    timecodes: [...this.props.timecodes],
  }

  componentDidMount() {
    this.props.openPopout(<ScreenSpinner/>)

    this.waveform = WaveSurfer.create({
      container: this.waveformRef.current,
      waveColor: '#3F8AE0',
      progressColor: '#3F8AE0',
      cursorColor: '#FF3347',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 96,
      barGap: 4,
      plugins: [
        Timeline.create({
          container: "#timeline",
          height: 9,
          primaryColor: '#99A2AD',
          secondaryColor: '#99A2AD',
          primaryFontColor: '#99A2AD',
          secondaryFontColor: '#99A2AD',
          notchPercentHeight: 100,
          formatTimeCallback: secToDuration
        }),
        Region.create(),
      ]
    });

    this.waveform.on('error', function(e) {
      console.warn(e);
    });

    this.waveform.loadBlob(this.state.audio.file);

    this.waveform.on("ready", () => {
      this.waveform.zoom(30)
      this.props.closePopout()
      this.props.setAudioDuration(secToDuration(this.waveform.getDuration()))
    });
    this.waveform.on("play", () => {
      this.setState({ play: true })
    });
    this.waveform.on("pause", () => {
      this.setState({ play: false })
    });
    this.waveform.on('audioprocess', this.applyFilters)
    const debounceSetFilterRegions = debounce((data) => {
      const start = Math.max(0, data.start)
      const end = Math.min(data.end, this.waveform.backend.buffer.duration)
      this.setState((state) => ({
        effects: {
          ...state.effects,
          [data.id]: {
            start: start,
            end: end
          }
        }
      }))
      if (data.id === 'fadeIn') {
        this.props.setFadeIn(start, end)
      }
      if (data.id === 'fadeOut') {
        this.props.setFadeOut(start, end)
      }
    }, 500)
    this.waveform.on('region-updated', debounceSetFilterRegions)
    this.waveform.on('region-click', (e) => {
      this.waveform.regions.list[e.id].play()
    })

    if (this.state.effects.fadeIn) {
      this.waveform.addRegion({
        id: 'fadeIn',
        start: this.state.effects.fadeIn.start,
        end: this.state.effects.fadeIn.end,
        drag: false,
        minLength: 1,
        maxLength: 60
      })
    }
    if (this.state.effects.fadeOut) {
      this.waveform.addRegion({
        id: 'fadeOut',
        start: this.state.effects.fadeOut.start,
        end: this.state.effects.fadeOut.end,
        drag: false,
        minLength: 1,
        maxLength: 60
      })
    }
  };

  componentWillUnmount() {
    this.waveform.destroy()
  }

  togglePlay() {
    this.waveform.playPause()
  }

  isValueInRegion(value, start, end) {
    return value >= start && value <= end
  }

  applyFilters(currentTime) {
    const fadeInTimeRage = this.state.effects.fadeIn ? [this.state.effects.fadeIn.start, this.state.effects.fadeIn.end] : null
    const fadeOutTimeRage = this.state.effects.fadeOut ? [this.state.effects.fadeOut.start, this.state.effects.fadeOut.end] : null

    if (fadeInTimeRage) {
      if (this.isValueInRegion(currentTime, fadeInTimeRage[0], fadeInTimeRage[1])) {
        this.waveform.backend.gainNode.gain.value = currentTime / fadeInTimeRage[1]
        return
      }
    }

    if (fadeOutTimeRage) {
      if (this.isValueInRegion(currentTime, fadeOutTimeRage[0], fadeOutTimeRage[1])) {
        this.waveform.backend.gainNode.gain.value = 1 - ((currentTime - fadeOutTimeRage[0]) / (fadeOutTimeRage[1] - fadeOutTimeRage[0]))
        return
      }
    }

    this.waveform.backend.gainNode.gain.value = 1
  }

  createFadeInRegion() {
    if (!this.state.isFadeInRegionCreated) {
      this.waveform.addRegion({
        id: 'fadeIn',
        start: 0,
        end: 5,
        drag: false,
        minLength: 1,
        maxLength: 60
      })
      this.setState({isFadeInRegionCreated: true})
      this.setState((state) => ({
        effects: {
          ...state.effects,
          fadeIn: {
            start: 0,
            end: 5
          }
        }
      }))
      this.props.setFadeIn(0, 5)
      this.waveform.seekTo(0)
      this.waveform.zoom(30)
    } else {
      this.waveform.regions.list["fadeIn"].remove()
      this.setState({isFadeInRegionCreated: false})
      this.setState((state) => ({
        effects: {
          ...state.effects,
          fadeIn: null
        }
      }))
      this.props.clearFadeIn(null)
    }
  }

  createFadeOutRegion() {
    if (!this.state.isFadeOutRegionCreated) {
      this.waveform.addRegion({
        id: 'fadeOut',
        start: this.waveform.backend.buffer.duration - 5,
        end: this.waveform.backend.buffer.duration,
        drag: false,
        minLength: 1,
        maxLength: 60
      })
      this.setState({isFadeOutRegionCreated: true})
      this.setState((state) => ({
        effects: {
          ...state.effects,
          fadeOut: {
            start: this.waveform.backend.buffer.duration - 1,
            end: this.waveform.backend.buffer.duration
          }
        }
      }))
      this.props.setFadeOut(this.waveform.backend.buffer.duration - 1, 0)
      this.waveform.seekTo(1)
      this.waveform.zoom(30)
    } else {
      this.waveform.regions.list["fadeOut"].remove()
      this.setState({isFadeOutRegionCreated: false})
      this.setState((state) => ({
        effects: {
          ...state.effects,
          fadeOut: null
        }
      }))
      this.props.clearFadeOut(null)
    }
  }

  render() {
    const {id, goBack, setPage} = this.props

    const timecodes = this.state.timecodes.map((el, index) => {
      return (
        <div className="TimecodeLine" key={index}>
          <div className="timecodeDescrition">
            <Input name="metka" placeholder="Название метки" value={el.title} onChange={(e) => {
              const value = e.currentTarget.value
              let newState = [...this.state.timecodes]
              newState[index] = {...newState[index], title: value}
              this.setState({timecodes: newState})
            }} />
          </div>
          <div className="timecodeTime">
            <Input name="time" pattern="[0-9:]*" placeholder="00:00" value={el.time} onChange={(e) => {
              if (e.currentTarget.value.length > 8) {
                return
              }
              if (e.target.validity.valid) {
                const value = e.currentTarget.value
                let newState = [...this.state.timecodes]
                newState[index] = {...newState[index], time: value}
                this.setState({timecodes: newState})
              }
            }} />
          </div>
          <div
            className="timecodeDelete"
            onClick={
              () => this.setState({ timecodes: this.state.timecodes.filter((_ ,i) => i !== index) })
            }
          >
            <Icon24Cancel fill="var(--content_placeholder_text)" />
          </div>
        </div>
      )
    })

    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => {this.props.setTimecodes(this.state.timecodes); this.props.sortTimecodes(); goBack()}} />}>
          Редактирование
        </PanelHeader>
        <div>
          <Div>
            <div className="AudioEditor">
              <div id="timeline" />
              <div id="waveform" ref={this.waveformRef} />
              <div className="AudioEditor__controls">
                <div className="AudioEditor__controls__group">
                  <div className="AudioEditor__controls__play" onClick={this.togglePlay}>
                    {this.state.play
                      ? <Icon28Pause fill="#fff"/>
                      : <Icon28Play fill="#fff" />
                    }
                  </div>
                </div>
                <div className="AudioEditor__controls__group">
                  <div
                    className={
                      `AudioEditor__controls__secondary AudioEditor__controls__fadeIn 
                  ${this.state.isFadeInRegionCreated ? "AudioEditor__controls__secondary--active" : ""}`
                    }
                    onClick={this.createFadeInRegion}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20V10" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 20V4" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 20V16" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div
                    className={
                      `AudioEditor__controls__secondary AudioEditor__controls__fadeOut 
                  ${this.state.isFadeOutRegionCreated ? "AudioEditor__controls__secondary--active" : ""}`
                    }
                    onClick={this.createFadeOutRegion}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20V10" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 20V4" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 20V16" stroke="#3F8AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Div>
          <Group header={<Header mode="secondary">Таймкоды</Header>} style={{paddingBottom: 75}}>
            <Div style={{paddingTop: 0, paddingBottom: 0}}>
              {timecodes}
            </Div>
            <CellButton before={<Icon24Add />} onClick={() => {
              let newState = [...this.state.timecodes]
              newState.push({title: '', time: secToDuration(this.waveform.getCurrentTime())})
              this.setState({ timecodes: newState })
            }}>Добавить таймкод</CellButton>
            <Div style={{paddingTop: 0, paddingBottom: 0}}>
              <p style={{margin: 0, marginTop: 5, fontSize: 13, color: 'var(--text_secondary)'}}>
                Отметки времени с названием темы. Позволяют слушателям легче путешествовать по подкасту.
              </p>
            </Div>
          </Group>
          <FixedLayout filled vertical="bottom">
            <Div>
              <Button
                size="xl"
                disabled={
                  this.state.timecodes.filter((el) => {
                    return el.title === "" || el.title === ""
                  }).length > 0
                }
                onClick={() => {this.props.setTimecodes(this.state.timecodes); this.props.sortTimecodes(); goBack()}}
              >
                Далее
              </Button>
            </Div>
          </FixedLayout>
        </div>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  podcast: state.podcast,
  audio: state.audio,
  timecodes: state.timecode,
  effects: state.effects,
})

export default connect(mapStateToProps, {goBack, setPage, setTimecodes, openPopout, closePopout, setFadeIn, setFadeOut, clearFadeIn, clearFadeOut, setAudioDuration, sortTimecodes})(PodcastEdit)
