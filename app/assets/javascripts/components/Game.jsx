class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      selectedPiece: null,
      kingsHealth: null,
      attacker: "",
      defender: ""
    };
    this.selectPiece = this.selectPiece.bind(this);
    this.unselectPiece = this.unselectPiece.bind(this);
    this.getPieces = this.getPieces.bind(this);
    this.getGameInfo = this.getGameInfo.bind(this);
  }

  componentDidMount() {
    this.getPieces();
    this.getGameInfo();
    this.handleWebsocketUpdates(this);
  }

  handleWebsocketUpdates(gameComponent) {
    App.games = App.cable.subscriptions.create('GamesChannel', {
      received(data) {
        if(data.game_id === gameComponent.props.game_id) {
          if(data.update_is_needed === 'for_pieces') {
            gameComponent.getPieces();
          }
          if(data.update_is_needed === 'for_game_info') {
            gameComponent.getGameInfo();
          }
        }
      }
    });
  }

  getGameInfo() {
    axios.get(this.setRoot() + '/games/' + this.props.game_id + '/edit')
    .then((res) => this.setState({ 
      kingsHealth: res.data.kingshealth,
      attacker: res.data.attacker,
      defender: res.data.defender
    }))
    .catch((err) => console.log(err.response.data));
  }

  setRoot() {
    //return 'http://localhost:3000';
    return 'https://viking-chess-andy-strube.herokuapp.com';
  }

  getPieces() {
    axios.get(this.setRoot() + '/games/' + this.props.game_id + '/pieces')
    .then((res) => this.setState({ pieces: res.data }))
    .catch((err) => console.log(err.response.data));
  }

  selectPiece(piece) {
    if(this.state.kingsHealth !== 'escaped' && this.state.kingsHealth !== 'dead') {
      this.setState({ selectedPiece: piece });
    }
  }

  unselectPiece() {
    this.setState({ selectedPiece: null });
  }

  buildBoard() {
    return <div>
      <Board
        pieces={this.state.pieces}
        selectPiece={this.selectPiece}
        unselectPiece={this.unselectPiece}
        selectedPiece={this.state.selectedPiece}
        setRoot={this.setRoot}
        game_id={this.props.game_id}
        getPieces={this.getPieces}
        kingsHealth={this.state.kingsHealth}
        getGameInfo={this.getGameInfo}
      />
    </div>
  }

  renderVictoryStatement(kingsHealth) {
    return <div>
      <VictoryStatement
        kingsHealth={kingsHealth}
      />
    </div>
  }

  renderTeamForm(attacker, defender) {
    return <div>
      <TeamForm
        current_user={this.props.current_user}
        setRoot={this.setRoot}
        game_id={this.props.game_id}
        closeTeamForm={this.closeTeamForm}
        attacker={attacker}
        defender={defender}
        getGameInfo={this.getGameInfo}
      />
    </div>
  }

  renderWhoVsWho(attacker, defender) {
    return <div>
      <WhoVsWho
        attacker={attacker}
        defender={defender}
      />
    </div>
  }

  render() {
    return <div>
      {this.renderTeamForm(this.state.attacker, this.state.defender)}
      {this.renderWhoVsWho(this.state.attacker, this.state.defender)}
      {this.renderVictoryStatement(this.state.kingsHealth)}
      {this.buildBoard()}
    </div>
  }
}
