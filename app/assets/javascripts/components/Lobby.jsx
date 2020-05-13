class Lobby extends React.Component {

  componentDidMount() {
    this.handleWebsocketUpdates();
  }

  handleWebsocketUpdates() {
    App.games = App.cable.subscriptions.create('GamesChannel', {
      received(data) {
        if(data.update_is_needed === 'for_lobby') {
          location.reload();
        }
      }
    });
  }

  render() {
    return <h1 className="page-content make-it-green">
      Lobby
    </h1>
  }
}
