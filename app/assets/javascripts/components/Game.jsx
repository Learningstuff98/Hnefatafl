class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      selectedPiece: null,
      kingsHealth: null
    };
    this.selectPiece = this.selectPiece.bind(this);
    this.unselectPiece = this.unselectPiece.bind(this);
    this.getPieces = this.getPieces.bind(this);
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
    .then((res) => this.setState({ kingsHealth: res.data.kingshealth }))
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

  render() {
    return <div>
      {this.renderVictoryStatement(this.state.kingsHealth)}
      {this.buildBoard()}
    </div>
  }
}
