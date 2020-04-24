class Tile extends React.Component {

  handleColor() {
    if(this.props.escapeTile) {
      return "red";
    } else if(this.props.middleTile) {
      return "red";
    } else if(this.props.xCoord % 2 !== 0 && this.props.yCoord % 2 !== 0) {
      return "light";
    } else if(this.props.xCoord % 2 === 0 && this.props.yCoord % 2 === 0) {
      return "light";
    } else {
      return "dark";
    }
  }

  buildTile(piece) {
    return <span className={"tile " + this.handleColor()}>
      {this.buildPiece(piece)}
    </span>
  }

  buildPiece(piece) {
    if(piece && piece.piece_type === 'attacker') {
      return <h2 className="make-it-red">
        {"A"}
      </h2>
    } else {
      return <span></span>
    }
  }

  render() {
    return <span onClick={() => console.log(this.props.xCoord, this.props.yCoord, this.props.escapeTile)}>
      {this.buildTile(this.props.piece)}
    </span>
  }
}
