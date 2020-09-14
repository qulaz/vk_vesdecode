import React from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import {IOS, platform} from '@vkontakte/vkui'
import PhotoHolder from '../components/PhotoHolder'
import { Input, Textarea, Select, Button, Div, Panel, PanelHeader, PanelHeaderButton, FormLayout } from '@vkontakte/vkui'
import { connect } from 'react-redux'

import { setAuthor, setGeneralFields } from '../store/actions'
import StickyFooter from '../components/StickyFooter'

const osName = platform()


class GoalDonation extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  filledFieldsKeys = ["title", "sum", "goal", "description", "billID"]
  filledFields = Object.entries(this.props.current).reduce((i, kv) => {
    const [k, v] = kv
    if (this.filledFieldsKeys.includes(k)) {
      i.push([k, !!v])
    }
    return i
  }, [])
  state = { ...this.props.current, filledFields: Object.fromEntries(this.filledFields) }

  onChange(e) {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
    this.setState({filledFields: {...this.state.filledFields, [name]: value !== ""}})
  }

  submit() {
    this.props.setAuthor(this.state.authorID)
    this.props.setGeneralFields({
      type: "goal",
      title: this.state.title,
      sum: this.state.sum,
      billID: this.state.billID,
      description: this.state.description,
      goal: this.state.goal
    })
  }

  render() {
    const billsOption = this.props.bills.map((bill) =>
      <option value={bill.id.toString()} key={bill.id}>{bill.title}</option>
    )

    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={this.props.go} data-to="donation_type">
              {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>
          }
        >
          Целевой сбор
        </PanelHeader>
        <Div>
          <PhotoHolder />
        </Div>
        <FormLayout>
          <Input
            type="text"
            top="Название сбора"
            placeholder="Название сбора"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <Input
            type="text"
            pattern="[0-9]*"
            top="Сумма, ₽"
            placeholder="Сколько нужно собрать?"
            name="sum"
            value={this.state.sum}
            onChange={(e) => {
              if (e.target.validity.valid) {
                this.onChange(e)
              }
            }}
          />
          <Input
            type="text"
            top="Цель"
            placeholder="Например, лечение человека"
            name="goal"
            value={this.state.goal}
            onChange={this.onChange}
          />
          <Textarea
            top="Описание"
            placeholder="На что пойдут деньги и как они кому-то помогут?"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <Select
            top="Куда получать деньги"
            defaultValue={this.props.current.billID.toString()}
            name="billID"
            value={this.state.billID}
            onChange={this.onChange}
          >
            {billsOption}
          </Select>
        </FormLayout>
        <StickyFooter>
          <Button
            size="xl"
            disabled={
              Object.values(this.state.filledFields).filter((i) => {return i === true}).length !== 5 ||
              this.props.photo === null
            }
            onClick={(e) => {
              this.submit()
              this.props.go(e)
            }}
            data-to="goal_donation_additional"
          >
            Далее
          </Button>
        </StickyFooter>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  bills: state.donations.bills,
  authors: state.donations.authors,
  current: state.donations.currentDonut,
  photo: state.donations.currentDonut.photo,
})

export default connect(mapStateToProps, { setAuthor, setGeneralFields })(GoalDonation)
