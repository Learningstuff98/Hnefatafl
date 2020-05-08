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
        kingsHealth={this.props.kingsHealth}
      />
    } else {
      return <div></div>
    }
  }

  getPathCoords(startingPoint, endingPoint, direction) {
    let coords = [];
    for(let xOrY = startingPoint + 1; xOrY < endingPoint; xOrY++) {
      if(direction === 'vertical') {
        coords.push([this.props.xCoord, xOrY]);
      } else {
        coords.push([xOrY, this.props.yCoord]);
      }
    }
    return coords;
  }

  isVerticalPathClear(startingPoint, endingPoint) {
    const coords = this.getPathCoords(startingPoint, endingPoint, 'vertical');
    for(piece of this.props.pieces) {
      for(coordPair of coords) {
        if(piece.x_coord === coordPair[0] && piece.y_coord === coordPair[1]) {
          return false;
        }
      }
    }
    return true;
  }

  isValidVerticalMove() {
    if(this.props.selectedPiece.x_coord === this.props.xCoord) {
      if(this.props.selectedPiece.y_coord < this.props.yCoord) {
        return this.isVerticalPathClear(this.props.selectedPiece.y_coord, this.props.yCoord)
      }
      if(this.props.selectedPiece.y_coord > this.props.yCoord) {
        return this.isVerticalPathClear(this.props.yCoord, this.props.selectedPiece.y_coord)
      }
    }
  }

  isHorizontalPathClear(startingPoint, endingPoint) {
    const coords = this.getPathCoords(startingPoint, endingPoint, 'horizontal');
    for(piece of this.props.pieces) {
      for(coordPair of coords) {
        if(piece.x_coord === coordPair[0] && piece.y_coord === coordPair[1]) {
          return false;
        }
      }
    }
    return true;
  }

  isValidHorizontalMove() {
    if(this.props.selectedPiece.y_coord === this.props.yCoord) {
      if(this.props.selectedPiece.x_coord < this.props.xCoord) {
        return this.isHorizontalPathClear(this.props.selectedPiece.x_coord, this.props.xCoord);
      }
      if(this.props.selectedPiece.x_coord > this.props.xCoord) {
        return this.isHorizontalPathClear(this.props.xCoord, this.props.selectedPiece.x_coord);
      }
    }
  }

  isValidMove() {
    if(this.props.selectedPiece) {
      if(this.isValidVerticalMove()) {
        if(this.isValidTile()) {
          return true;
        }
      }
      if(this.isValidHorizontalMove()) {
        if(this.isValidTile()) {
          return true;
        }
      }
    }
  }

  deletePiece(pieceId) {
    axios.delete(this.props.setRoot() + '/games/' + this.props.game_id + '/pieces/' + pieceId)
    .catch((err) => console.log(err.response.data));
  }

  isValidTile() {
    if(this.props.piece) {
      if(this.props.piece.piece_type === 'defender') {
        if(this.props.selectedPiece.piece_type === 'attacker') {
          this.deletePiece(this.props.piece.id);
          return true;
        }
      }
      if(this.props.piece.piece_type === 'attacker') {
        if(this.props.selectedPiece.piece_type === 'defender') {
          this.deletePiece(this.props.piece.id);
          return true;
        }
      }
      if(this.props.piece.piece_type === 'attacker') {
        if(this.props.selectedPiece.piece_type === 'king') {
          this.deletePiece(this.props.piece.id);
          return true;
        }
      }
      if(this.props.piece.piece_type === 'king') {
        if(this.props.selectedPiece.piece_type === 'attacker') {
          if(this.props.kingsHealth === "good") {
            this.deletePiece(this.props.selectedPiece.id);
            this.updateKingsHealth();
            this.setTurnToDefenders();
            return true;
          } else {
            this.deletePiece(this.props.piece.id);
            this.updateKingsHealth();
            return true;
          }
        }
      }
    } else {
      return true;
    }
  }

  setTurnToDefenders() {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id, {
      attackers_turn: false
    })
    .catch((err) => console.log(err.response.data));
  }

  setKingsHealthStatus() {
    if(this.props.kingsHealth === "good") {
      return "poor";
    }
    if(this.props.kingsHealth === "poor") {
      return "dead";
    }
  }

  updateKingsHealth() {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id, {
      kingshealth: this.setKingsHealthStatus()
    })
    .catch((err) => console.log(err.response.data));
  }

  isValidPieceTypeForEscapeTile() {
    if(this.props.isEscapeTile) {
      if(this.props.selectedPiece.piece_type === 'king') {
        this.setDefenderAsWinner();
        return true;
      }
    } else {
      return true;
    }
  }

  setDefenderAsWinner() {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id, {
      kingshealth: "escaped"
    })
    .catch((err) => console.log(err.response.data));
  }

  updateCoords(selectedPiece, x, y) {
    if(this.isValidMove() && this.isValidPieceTypeForEscapeTile()) {
      axios.patch(this.props.setRoot() + '/games/' + this.props.game_id + '/pieces/' + selectedPiece.id, {
        x_coord: x,
        y_coord: y
      })
      .then(() => this.props.unselectPiece())
      .catch((err) => console.log(err.response.data));
    } else {
      this.props.unselectPiece();
    }
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
