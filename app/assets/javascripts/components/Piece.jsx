class Piece extends React.Component {

  setAttackingPiece() {
    return <div className="red piece">
    </div>
  }

  setDefendingPiece() {
    return <div className="defender piece">
    </div>
  }

  setKingPiece() {
    return <div className={"king piece " + this.props.kingsHealth}>
    </div>
  }

  setPiece(piece_type) {
    if(piece_type === "attacker") {
      return this.setAttackingPiece();
    }
    if(piece_type === "defender") {
      return this.setDefendingPiece();
    }
    if(piece_type === "king") {
      return this.setKingPiece();
    }
  }

  render() {
    return <div>
      {this.setPiece(this.props.piece.piece_type)}
    </div>
  }
}
