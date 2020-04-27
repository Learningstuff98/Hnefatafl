class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      selectedPiece: null
    };
    this.selectPiece = this.selectPiece.bind(this);
    this.unselectPiece = this.unselectPiece.bind(this);
    this.getPieces = this.getPieces.bind(this);
  }

  componentDidMount() {
    this.getPieces();
    this.handleWebsocketUpdates(this);
  }

  handleWebsocketUpdates(gameComponent) {
    App.games = App.cable.subscriptions.create('GamesChannel', {
      received(data) {
        if(data.game_id === gameComponent.props.game_id) {
          if(data.update_is_needed === 'for_pieces') {
            gameComponent.getPieces();
          }
        }
      }
    });
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
    this.setState({
      selectedPiece: piece
    });
  }

  unselectPiece() {
    this.setState({
      selectedPiece: null
    });
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
      />
    </div>
  }

  render() {
    return <div>
      {this.buildBoard()}
    </div>
  }
}
