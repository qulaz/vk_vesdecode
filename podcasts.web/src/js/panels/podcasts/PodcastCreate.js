import React from "react";
import { connect } from "react-redux";
import {
  Panel,
  Button,
  PanelHeader,
  PanelHeaderBack,
  Input,
  Textarea,
  FormLayout,
  Separator,
  Checkbox,
  FormLayoutGroup,
  Cell,
  Group,
  Div,
  FixedLayout
} from "@vkontakte/vkui";

import {
  closePopout,
  goBack,
  openModal,
  openPopout,
  setPage,
} from "../../store/router/actions";
import { setPodcastCover, setPodcastInfo } from '../../store/podcast/actions'
import { setAudio } from '../../store/audio/actions'
import ImageUploader from '../../components/ImageUploader'
import AudioUploader from '../../components/AudioUploader'

class PodcastCreate extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
    this.submit = this.submit.bind(this)
  }

  filledFieldsKeys = ["title", "description"]
  filledFields = Object.entries(this.props.podcast).reduce((i, kv) => {
    const [k, v] = kv
    if (this.filledFieldsKeys.includes(k)) {
      i.push([k, !!v])
    }
    return i
  }, [])
  state = { ...this.props.podcast, filledFields: Object.fromEntries(this.filledFields) }

  onChange(e) {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
    this.setState((state) => ({
      filledFields: {...this.state.filledFields, [name]: value !== ""}
    }))
  }

  onChangeCheckbox(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  submit() {
    this.props.setPodcastInfo(
      this.state.title, this.state.description, this.state.isExplicit, this.state.isExclude, this.state.isTrailer
    )
  }

  render() {
    const { id, setPage, goBack, openModal } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
          Новый подкаст
        </PanelHeader>

        <FormLayout style={{paddingBottom: 50}}>
          <div style={{display: 'flex'}}>
            <ImageUploader
              style={{paddingLeft: 12}}
              image={this.props.podcast.cover}
              onSetImage={(cover) => {
                this.props.setPodcastCover(cover)
                this.setState((state) => ({
                  ...state, cover,
                  filledFields: {...state.filledFields, cover: !!cover}
                }))
              }}
            />
            <div style={{width: '100%'}}>
              <div className="FormLayout__row-top">
                Название
              </div>
              <Input
                top="Название"
                placeholder="Введите название подкаста"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
          </div>

          <Textarea
            top="Описание подкаста"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <FormLayoutGroup>
            <AudioUploader beforeLeave={this.submit} />

            <Separator wide />

            <Checkbox
              name="isExplicit"
              checked={this.state.isExplicit}
              onChange={this.onChangeCheckbox}
            >
              Ненормативный контент
            </Checkbox>
            <Checkbox
              name="isExclude"
              checked={this.state.isExclude}
              onChange={this.onChangeCheckbox}
            >
              Исключить эпизод из экспорта
            </Checkbox>
            <Checkbox
              name="isTrailer"
              checked={this.state.isTrailer}
              onChange={this.onChangeCheckbox}
            >
              Трейлер подкаста
            </Checkbox>
          </FormLayoutGroup>

          <Group description="При публикации записи с эпизодом, он становится доступным для всех пользователей">
            <Cell
              expandable
              size="m"
              description={this.props.available}
              onClick={() => {openModal("PODCAST_SELECT_VIEW_MODE")}}
            >
              Кому доступен данный подкаст
            </Cell>
          </Group>
        </FormLayout>
        <FixedLayout filled vertical="bottom">
          <Div>
            <Button
              size="xl"
              disabled={
                Object.values(this.state.filledFields).filter((i) => {return i === true}).length < 2 || !this.props.file || !this.props.cover
              }
              onClick={() => {this.submit(); setPage("podcast", "preview")}}
            >
              Далее
            </Button>
          </Div>
        </FixedLayout>
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  podcast: state.podcast,
  available: state.podcast.available,
  audio: state.audio,
  file: state.audio.file,
  cover: state.podcast.cover
})
const mapDispatchToProps = {
  setPage,
  goBack,
  openPopout,
  closePopout,
  openModal,
  setPodcastCover,
  setPodcastInfo,
  setAudio
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastCreate);
