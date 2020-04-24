class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: []
    };
  }

  componentDidMount() {
    this.getPieces();
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

  buildBoard() {
    return <div>
      <Board
        pieces={this.state.pieces}
      />
    </div>
  }

  render() {
    return <div>
      {this.buildBoard()}
    </div>
  }  
}
