import React from "react";
import { connect } from "react-redux";
import { Panel, Placeholder, Button, PanelHeader } from "@vkontakte/vkui";
import Icon56AddCircleOutline from "@vkontakte/icons/dist/56/add_circle_outline";

import {
  closePopout,
  goBack,
  openModal,
  openPopout,
  setPage,
} from "../store/router/actions";

class HomePanel extends React.Component {
  render() {
    const { id, setPage } = this.props;

    return (
      <Panel id={id} centered>
        <PanelHeader>Подкасты</PanelHeader>
        <Placeholder
          icon={<Icon56AddCircleOutline />}
          header="Добавьте первый подкаст"
          action={<Button size="l">Добавить подкаст</Button>}
          onClick={() => setPage("podcast", "create")}
        >
          Добавляйте, редактируйте и делитесь подкастами вашего сообщества.
        </Placeholder>
      </Panel>
    );
  }
}

const mapDispatchToProps = {
  setPage,
  goBack,
  openPopout,
  closePopout,
  openModal,
};

export default connect(null, mapDispatchToProps)(HomePanel);
