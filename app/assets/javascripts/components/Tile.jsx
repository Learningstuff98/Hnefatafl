class Tile extends React.Component {

  setColor() {
    if(this.props.isEscapeTile) {
      return "red";
    } else if(this.props.isMiddleTile) {
      return "red";
    } else if(this.props.xCoord % 2 !== 0 && this.props.yCoord % 2 !== 0) {
      return "light";
    } else if(this.props.xCoord % 2 === 0 && this.props.yCoord % 2 === 0) {
      return "light";
    } else {
      return "dark";
    }
  }

  setSelectedColor() {
    if(this.props.selectedPiece && this.props.piece) {
      if(this.props.selectedPiece.id === this.props.piece.id) {
        return "selected";
      }
    }
  }

  buildTile(piece) {
    return <span className={"tile " + this.setColor() + " " + this.setSelectedColor()}>
      {this.buildPiece(piece)}
    </span>
  }

  buildPiece(piece) {
    if(piece) {
      return <Piece
        piece={piece}
      />
    } else {
      return <div></div>
    }
  }

  updateCoords(selectedPiece, x, y) {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id + '/pieces/' + selectedPiece.id, {
      x_coord: x,
      y_coord: y
    })
    .then(() => this.props.unselectPiece())
    .catch((err) => console.log(err.response.data));
  }

  handlePieceMovement() {
    if(!this.props.selectedPiece) {
      this.props.selectPiece(this.props.piece)
    }
    if(this.props.selectedPiece) {
      this.updateCoords(this.props.selectedPiece, this.props.xCoord, this.props.yCoord);
    }
  }

  render() {
    return <span onClick={() => this.handlePieceMovement(this.props.piece)}>
      {this.buildTile(this.props.piece)}
    </span>
  }
}
