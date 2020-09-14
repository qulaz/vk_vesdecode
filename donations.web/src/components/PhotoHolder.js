import React from 'react'
import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';
import Icon24DismissOverlay from '@vkontakte/icons/dist/24/dismiss_overlay';
import './PhotoHolder.css'
import { connect } from 'react-redux'
import { setPhoto } from '../store/actions'


class PhotoHolder extends React.Component {
  constructor(props) {
    super(props)
    this.photoInput = React.createRef()
    this.onInput = this.onInput.bind(this);
  }

  selectPhoto() {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.props.setPhoto(e.target.result)
    }
    reader.readAsDataURL(this.photoInput.current.files[0])
  }

  onInput(e) {
    if (e.type === "input") {
      console.log("sd")
      this.selectPhoto()
    }
  }

  render() {
    return (
      <div className="PhotoHolder">
        { this.props.photoPath === null &&
        <label className="PhotoHolder PhotoHolder__label">
          <input ref={this.photoInput} type="file" accept="image/*" multiple onInput={this.onInput} />
        </label>
        }
        {
          !this.props.photoPath &&
          <div className="wrapper">
            <Icon28PictureOutline fill="#3F8AE0" />
            <p>Загрузить обложку</p>
          </div>
        }
        {
          this.props.photoPath &&
          <div className="ImgContainer" style={{"backgroundImage": `url(${this.props.photoPath})`}}>
            <div className="close" onClick={() => {
              this.setState({ photoPath: null })
              this.props.setPhoto(null)
            }}><Icon24DismissOverlay /></div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  photoPath: state.donations.currentDonut.photo,
})

export default connect(mapStateToProps, { setPhoto })(PhotoHolder)
