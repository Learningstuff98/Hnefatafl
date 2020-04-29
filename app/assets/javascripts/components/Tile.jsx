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

  getVerticalPathCoords(startingPoint, endingPoint) {
    let coords = [];
    for(let y = startingPoint + 1; y < endingPoint; y++) {
      coords.push([this.props.xCoord, y]);
    }
    return coords;
  }

  isVerticalPathClear(startingPoint, endingPoint) {
    const coords = this.getVerticalPathCoords(startingPoint, endingPoint);
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

  getHorizontalPathCoords(startingPoint, endingPoint) {
    let coords = [];
    for(let x = startingPoint + 1; x < endingPoint; x++) {
      coords.push([x, this.props.yCoord]);
    }
    return coords;
  }

  isHorizontalPathClear(startingPoint, endingPoint) {
    const coords = this.getHorizontalPathCoords(startingPoint, endingPoint);
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
        return true;
      }
      if(this.isValidHorizontalMove()) {
        return true;
      }
    }
  }

  updateCoords(selectedPiece, x, y) {
    if(this.isValidMove() && !this.props.piece) {
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
