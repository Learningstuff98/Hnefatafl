class Board extends React.Component {

  setDimensions() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  isEscapeTile(xCoord, yCoord) {
    const dimensionsMinMax = [1, this.setDimensions().pop()];
    if(dimensionsMinMax.includes(xCoord) && dimensionsMinMax.includes(yCoord)) {
      return true;
    }
    return false;
  }

  isMiddleTile(x, y) {
    if(x === this.setDimensions().length / 2 + .5) {
      if(y === this.setDimensions().length / 2 + .5) {
        return true
      }
    }
    return false
  }

  findPiece(x, y, pieces) {
    return pieces.find(
      piece => piece.x_coord === x && piece.y_coord === y
    );
  }

  buildRow(yCoord) {
    return this.setDimensions().map((x) => {
      return <span key={x}>
        <Tile
          xCoord={x}
          yCoord={yCoord}
          piece={this.findPiece(x, yCoord, this.props.pieces)}
          isEscapeTile={this.isEscapeTile(x, yCoord)}
          isMiddleTile={this.isMiddleTile(x, yCoord)}
          selectPiece={this.props.selectPiece}
          unselectPiece={this.props.unselectPiece}
          selectedPiece={this.props.selectedPiece}
          setRoot={this.props.setRoot}
          game_id={this.props.game_id}
          getPieces={this.props.getPieces}
        />
      </span>
    });
  }

  buildRows() {
    return this.setDimensions().reverse().map((y) => {
      return <div className="board-row" key={y}>
        {this.buildRow(y)}
      </div>
    });
  }

  render() {
    return <div>
      {this.buildRows()}
    </div>
  }
}
