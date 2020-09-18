import React from 'react'
import PropTypes from 'prop-types'
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';

import './style.css'


class ImageUploader extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.ImageInput = React.createRef()
    this.onInput = this.onInput.bind(this);
  }

  state = {
    imageBase64: null
  }

  readPhoto() {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (this.props.onSetImage) {
        this.props.onSetImage(e.target.result)
      }
      this.setState({ imageBase64: e.target.result })
    }
    reader.readAsDataURL(this.ImageInput.current.files[0])
  }

  onInput(e) {
    if (e.type === "input") {
      this.readPhoto()
    }
  }

  componentDidMount() {
    if (!!this.props.image) {
      this.setState({ imageBase64: this.props.image })
    }
  }

  render() {
    return (
      <div className="ImageUploader" style={this.props.style}>
        <label
          className="ImageUploader ImageUploader__label"
          style={{backgroundImage: `url(${this.state.imageBase64})`}}
        >
          <input ref={this.ImageInput} type="file" accept="image/*" multiple onInput={this.onInput} />
          {
            (!this.state.imageBase64 && !this.props.image) &&
            <Icon56GalleryOutline fill="#3F8AE0" width={32} height={32} />
          }
        </label>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  // base64 image / photo path
  image: PropTypes.string,
  // func, first arg - base64 image
  onSetImage: PropTypes.func,
};

export default ImageUploader
