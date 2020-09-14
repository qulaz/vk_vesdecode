import React from 'react'
import { Card, CardGrid, Separator, Button, Progress } from '@vkontakte/vkui'
import PropTypes from 'prop-types'

import './DonationSnippet.css'
import {numberWithSpaces, millisecondsToHumanDuration} from '../utils'


class DonationSnippet extends React.Component {
  render() {
    return (
      <CardGrid>
        <Card size="l" mode="outline">
          <div className="Snippet" onClick={this.props.onClick} data-to={this.props["data-to"]}>
            <div className="Snippet__cover" style={{"backgroundImage": `url(${this.props.photo})`}}/>
            <div className="Snippet__wrapper">
              <div className="Snippet__body">
                <div className="Snippet__title">{ this.props.title }</div>
                <div className="Snippet__metaline">
                  <a href="#">{ this.props.author }</a> ·&nbsp;
                  { this.props.donationType === 'regular'
                    ? "Помощь нужна каждый месяц"
                    : `Закончится ${millisecondsToHumanDuration(new Date(this.props.goalEndDate) - new Date())}`
                  }
                </div>
              </div>
              <Separator />
              <div className="Snippet__footer">
                <div className="Snippet__progress">
                  {
                    this.props.donated === 0
                    ? <p>Помогите первым</p>
                    : <p>Собрано {numberWithSpaces(this.props.donated)} ₽ из {numberWithSpaces(this.props.needed)} ₽</p>
                  }
                  <Progress
                    value={this.props.donated / this.props.needed * 100}
                    style={{backgroundColor: "rgba(63, 138, 224, 0.3)"}}
                  />
                </div>
                <div className="Snippet__action">
                  <Button mode="outline" disabled={this.props.disabled === true}>Помочь</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </CardGrid>
    )
  }
}

DonationSnippet.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  // Сколько задоначено
  donated: PropTypes.number.isRequired,
  // Сколько необходимо задонатить
  needed: PropTypes.number.isRequired,
  // 'goal'/'regular'
  donationType: PropTypes.string.isRequired,
  goalEndDate: PropTypes.string,
};

export default DonationSnippet
