import React from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import {IOS, platform} from '@vkontakte/vkui'
import { Input, FormLayoutGroup, Select, Button, Panel, PanelHeader, PanelHeaderButton, FormLayout, Radio } from '@vkontakte/vkui'
import { connect } from 'react-redux'

import { getDateNextMonths } from '../utils'
import {setAuthor, setGoalCompletion} from '../store/actions'
import StickyFooter from '../components/StickyFooter'


const osName = platform()


class GoalDonationAdditional extends React.Component {
  state = {
    ...this.props.current
  }

  componentDidMount() {
    if (this.state.goalCompletion.completionDate === "") {
      let goalCompletion = {...this.state.goalCompletion}
      goalCompletion.completionDate = getDateNextMonths()
      this.setState({ goalCompletion })
    }
  }

  createDonation() {
    this.props.setAuthor(this.state.authorID)
    this.props.setGoalCompletion({
      completionCondition: this.state.goalCompletion.completionCondition,
      completionDate: this.state.goalCompletion.completionDate,
    })
  }

  render() {
    const authorOptions = this.props.authors.map((author) =>
      <option value={author.id.toString()} key={author.id}>{author.name}</option>
    )

    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={this.props.go} data-to="goal_donation">
              {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>
          }
        >
          Целевой сбор
        </PanelHeader>
        <FormLayout>
          <Select
            top="Автор"
            defaultValue={this.props.current.authorID.toString()}
            name="authorID"
            value={this.state.authorID}
            onChange={this.onChange}
          >
            {authorOptions}
          </Select>
          <FormLayoutGroup top="Сбор завершится">
            <Radio
              name="completionCondition"
              value="collected"
              defaultChecked={this.state.goalCompletion.completionCondition !== 'date'}
              onChange={(e) => {
                let goalCompletion = {...this.state.goalCompletion}
                goalCompletion.completionCondition = e.currentTarget.value;
                this.setState({ goalCompletion })
              }}
            >
              Когда соберем сумму
            </Radio>
            <Radio
              name="completionCondition"
              value="date"
              defaultChecked={this.state.goalCompletion.completionCondition === 'date'}
              onChange={(e) => {
                let goalCompletion = {...this.state.goalCompletion}
                goalCompletion.completionCondition = e.currentTarget.value;
                this.setState({ goalCompletion })
              }}
            >
              В определённую дату
            </Radio>
          </FormLayoutGroup>
          { this.state.goalCompletion.completionCondition === 'date' &&
            <Input
              type="date"
              value={this.state.goalCompletion.completionDate}
              onChange={(e) => {
                console.log(e.currentTarget.value)
                let goalCompletion = {...this.state.goalCompletion}
                goalCompletion.completionDate = e.currentTarget.value;
                this.setState({ goalCompletion })
              }}
            />
          }
        </FormLayout>
        <StickyFooter>
          <Button
            size="xl"
            disabled={this.state.goalCompletion.completionCondition === 'date' && !this.state.goalCompletion.completionDate}
            onClick={(e) => {
              this.createDonation()
              this.props.go(e)
            }}
            data-to="posting"
          >
            Создать сбор
          </Button>
        </StickyFooter>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  authors: state.donations.authors,
  current: state.donations.currentDonut
})

export default connect(mapStateToProps, { setAuthor, setGoalCompletion })(GoalDonationAdditional)
