import React from 'react'
import { connect } from 'react-redux'
import { PanelHeader, PanelHeaderButton, Tabs, TabsItem, Epic, Tabbar, TabbarItem, Panel, Div, RichCell, Avatar } from '@vkontakte/vkui'
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline'
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline'
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline'
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline'
import Icon28ClipOutline from '@vkontakte/icons/dist/28/clip_outline'
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline'
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';

import avatarImage from '../img/avatar.png'
import DonationSnippet from '../components/DonationSnippet'


class Feed extends React.Component {
  state = {
    ...this.props.current
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <Epic activeStory="feed" tabbar={
          <Tabbar>
            <TabbarItem text="Новости" selected ><Icon28NewsfeedOutline/></TabbarItem>
            <TabbarItem text="Сервисы"><Icon28ServicesOutline/></TabbarItem>
            <TabbarItem label="12" text="Сообщения"><Icon28MessageOutline/></TabbarItem>
            <TabbarItem text="Клипы"><Icon28ClipOutline/></TabbarItem>
            <TabbarItem text="Профиль"><Icon28UserCircleOutline/></TabbarItem>
          </Tabbar>
        }>
          <Panel id={this.props.id}>
            <PanelHeader
              left={<PanelHeaderButton><Icon28CameraOutline /></PanelHeaderButton>}
              right={<PanelHeaderButton><Icon28Notifications /></PanelHeaderButton>}
              separator={false}
              visor={false}
            >
              <Tabs>
                <TabsItem selected>Новости</TabsItem>
                <TabsItem>Интересное</TabsItem>
              </Tabs>
            </PanelHeader>
            <Div style={{ paddingTop: 60 }}>
              <RichCell
                before={<Avatar size={44} src={avatarImage} />}
                caption="час назад"
                after={<Icon24MoreHorizontal fill="#B8C1CC" />}
              >
                Матвей Правосудин
              </RichCell>
              <Div className="Feed__postText">
                { this.state.postText }
              </Div>
              <DonationSnippet
                photo={this.state.photo}
                title={this.state.title}
                author="Матвей Правосудов"
                donated={parseInt(this.state.sum)*0.75}
                needed={parseInt(this.state.sum)}
                goalEndDate={this.state.goalCompletion.completionDate}
                donationType={this.state.type}
                onClick={this.props.go}
                data-to="donation_view"
              />
            </Div>
          </Panel>
        </Epic>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  authors: state.donations.authors,
  current: state.donations.currentDonut,
})
export default connect(mapStateToProps)(Feed)
