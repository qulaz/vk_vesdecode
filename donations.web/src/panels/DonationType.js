import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import { IOS, platform } from '@vkontakte/vkui'
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

const osName = platform()


class DonationType extends React.Component {
  render() {
    return (
      <Panel id={this.props.id} centered>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={this.props.go} data-to="home">
              {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>
          }
        >
          Тип сбора
        </PanelHeader>
        <Div>
          <Banner
            before={<Icon28TargetOutline fill="#3F8AE0"/>}
            header="Целевой сбор"
            subheader="Когда есть обределённая цель"
            asideMode="expand"
            onClick={this.props.go}
            data-to="goal_donation"
          />
          <Banner
            before={<Icon28CalendarOutline fill="#3F8AE0"/>}
            header="Регулярный сбор"
            subheader="Если помощь нужна ежемесячно"
            asideMode="expand"
            onClick={this.props.go}
            data-to="regular_donation"
          />
        </Div>
      </Panel>
    )
  }
}


export default DonationType
