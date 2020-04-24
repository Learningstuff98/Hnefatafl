class Board extends React.Component {

  defineDimensions() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  isKingsTile(xCoord, yCoord) {
    if(xCoord === 1 || xCoord === 11) {
      if(yCoord === 1 || yCoord === 11) {
        return true;
      }
    } else if(xCoord === 6 && yCoord === 6) {
      return true;
    }
    return false;
  }

  findPiece(x, y, pieces) {
    for(let i = 0; i < pieces.length; i++) {
      if(pieces[i].x_coord === x && pieces[i].y_coord === y) {
        return pieces[i];
      }
    }
  }

  buildRow(yCoord) {
    return this.defineDimensions().map((x) => {
      const kingsTile = this.isKingsTile(x, yCoord);
      const piece = this.findPiece(x, yCoord, this.props.pieces);
      return <span key={x}>
        <Tile
          xCoord={x}
          yCoord={yCoord}
          kingsTile={kingsTile}
          piece={piece}
        />
      </span>
    });
  }

  buildRows() {
    return this.defineDimensions().reverse().map((y) => {
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
