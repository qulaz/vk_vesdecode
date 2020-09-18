import React from "react";
import {Panel, Placeholder, Button, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
import Icon56CheckCircleOutline from "@vkontakte/icons/dist/56/check_circle_outline";

class PodcastAdded extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Panel id={id} centered>
        <PanelHeader>
          Подкасты
        </PanelHeader>
        <Placeholder
          icon={<Icon56CheckCircleOutline fill="var(--accent)" />}
          header="Подкаст добавлен"
          action={<Button size="l">Поделиться подкастом</Button>}
        >
          Раскажите своим подписчикам о новом подкасте, чтобы получить больше слушателей.
        </Placeholder>
      </Panel>
    );
  }
}

export default PodcastAdded;
