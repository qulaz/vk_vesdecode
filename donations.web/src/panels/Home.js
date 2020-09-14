import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Placeholder from '@vkontakte/vkui/dist/components/Placeholder/Placeholder'

class Home extends React.Component {
  render() {
    return (
      <Panel id={this.props.id} centered>
        <PanelHeader>Пожертвования</PanelHeader>
          <Placeholder
            action={<Button size="l" onClick={this.props.go} data-to="donation_type">Создать сбор</Button>}
          >
            У вас пока нет сборов.<br/>
            Начните доброе дело
          </Placeholder>
      </Panel>
    )
  }
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home
