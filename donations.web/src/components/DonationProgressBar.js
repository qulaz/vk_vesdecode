import React from 'react'
import PropTypes from 'prop-types'
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress'

import './DonationProgressBar.css'


class DonationProgressBar extends React.Component {
  render() {
    return (
      <div className="DPBar">
        <p className="DPBar__title">Нужно собрать в сентябре</p>
        <Progress value={this.props.donated / this.props.needed * 100}/>
      </div>
    )
  }
}

DonationProgressBar.propTypes = {
  // Сколько задоначено
  donated: PropTypes.number.isRequired,
  // Сколько необходимо задонатить
  needed: PropTypes.number.isRequired,
  // 'goal'/'regular'
  donationType: PropTypes.string.isRequired,
  goalEndDate: PropTypes.string,
};

export default DonationProgressBar
