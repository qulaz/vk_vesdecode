import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import "./ProgressBar.css"

class ProgressBar extends React.PureComponent {
  render() {
    return (
      <div className="AudioUploader__progressBox">
        <div className="AudioUploader__progressBar" style={{width: `${this.props.progress}%`}}/>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar
