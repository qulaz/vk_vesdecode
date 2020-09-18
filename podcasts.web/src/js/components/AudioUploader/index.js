import React from 'react'
import {Button, Placeholder, Div, File, Spinner} from '@vkontakte/vkui'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Icon28PodcastOutline from '@vkontakte/icons/dist/28/podcast_outline';

import {closePopout, openPopout, setPage} from '../../store/router/actions'
import "./style.css"
import {clearAudio, setAudio} from '../../store/audio/actions'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'

class AudioUploader extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.Input = React.createRef()
    this.onInput = this.onInput.bind(this)
  }

  async onInput(e) {
    if (e.type === "input" || e.type === "change") {
      const file = this.Input.current.files[0]
      this.props.setAudio(file, file.name)
    }
  }

  render() {
    const audioPicker = (
      <File getRef={this.Input} size="l" mode="outline" controlSize="l" accept='.mp3' onChange={this.onInput}>
        Загрузить файл
      </File>
    )
    const viewPickedAudio = (
      <Div style={{paddingTop: 0, PaddingBottom: 0}}>
        <div className="AudioUploader__audioLine">
          <div className="AudioUploader__audioBox">
            <div className="AudioUploader__audioIcon">
              {/*TODO: подобрать цвет для темной темы*/}
              <Icon28PodcastOutline fill="#99A2AD" />
            </div>
            <div className="AudioUploader__audioTitle">
              {this.props.audio.name}
            </div>
          </div>
          <div className="AudioUploader__audioClose" onClick={this.props.clearAudio}>
            <Icon24Cancel fill="var(--content_placeholder_text)" />
          </div>
        </div>
        <div className="AudioUploader__EditInfo">
          <p>Вы можете добавить таймкоды и скорректировать подкаст в режиме редактирования</p>
          <Button
            mode="outline"
            size="xl"
            onClick={() => {if (this.props.beforeLeave) {this.props.beforeLeave()}; this.props.setPage('podcast', 'edit')}}
          >
            Редактировать аудиозапись
          </Button>
        </div>
      </Div>
    )

    return (
      <div className="AudioUploader__placeholder">
        {
          (!this.props.audio.file) &&
          <Placeholder
            header="Загрузите ваш подкаст"
            action={
              audioPicker
            }
          >
            Выберите готовый аудиофайл из вашего телефона и добавьте его
          </Placeholder>
        }
        { !!this.props.audio.file && viewPickedAudio }
      </div>
    )
  }
}

AudioUploader.propTypes = {
  beforeLeave: PropTypes.func,
};

const mapStateToProps = state => ({
  audio: state.audio,
})

export default connect(mapStateToProps, {openPopout, closePopout, setPage, setAudio, clearAudio})(AudioUploader)
