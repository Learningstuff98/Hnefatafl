class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      selectedPiece: null,
      kingsHealth: null,
      attacker: "",
      defender: "",
      attackersTurn: null
    };
    this.selectPiece = this.selectPiece.bind(this);
    this.unselectPiece = this.unselectPiece.bind(this);
    this.getPieces = this.getPieces.bind(this);
    this.getGameInfo = this.getGameInfo.bind(this);
  }

  componentDidMount() {
    this.getPieces();
    this.getGameInfo();
    this.getTurnStatus();
    this.handleWebsocketUpdates(this);
  }

  handleWebsocketUpdates(gameComponent) {
    App.games = App.cable.subscriptions.create('GamesChannel', {
      received(data) {
        if(data.game_id === gameComponent.props.game_id) {
          if(data.update_is_needed === 'for_pieces') {
            gameComponent.getPieces();
          }
          if(data.update_is_needed === 'for_turn') {
            gameComponent.getTurnStatus();
          }
          if(data.update_is_needed === 'for_game_info') {
            gameComponent.getGameInfo();
          }
        }
      }
    });
  }

  getTurnStatus() {
    axios.get(this.setRoot() + '/games/' + this.props.game_id + '/edit')
    .then((res) => this.setState({ 
      attackersTurn: res.data.attackers_turn
    }))
    .catch((err) => console.log(err.response.data));
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

  handleSelectionForAttackingPieces(piece) {
    if(this.state.attacker === this.props.current_user.username) {
      if(piece.piece_type === 'attacker') {
        if(this.state.attackersTurn) {
          this.setState({ selectedPiece: piece });
        }
      }
    }
  }

  handleSelectionForDefendingPieces(piece) {
    if(this.state.defender === this.props.current_user.username) {
      if(piece.piece_type === 'defender' || piece.piece_type === 'king') {
        if(!this.state.attackersTurn) {
          this.setState({ selectedPiece: piece });
        }
      }
    }
  }

  selectPiece(piece) {
    if(this.state.kingsHealth !== 'escaped' && this.state.kingsHealth !== 'dead') {
      this.handleSelectionForAttackingPieces(piece);
      this.handleSelectionForDefendingPieces(piece);
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
        attackersTurn={this.state.attackersTurn}
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

  renderCurrentTurn(attackersTurn) {
    return <div>
      <CurrentTurn
        attackersTurn={attackersTurn}
        attacker={this.state.attacker}
        defender={this.state.defender}
        kingsHealth={this.state.kingsHealth}
      />
    </div>
  }

  render() {
    return <div>
      {this.renderTeamForm(this.state.attacker, this.state.defender)}
      {this.renderWhoVsWho(this.state.attacker, this.state.defender)}
      {this.renderCurrentTurn(this.state.attackersTurn)}
      {this.renderVictoryStatement(this.state.kingsHealth)}
      {this.buildBoard()}
    </div>
  }
}
