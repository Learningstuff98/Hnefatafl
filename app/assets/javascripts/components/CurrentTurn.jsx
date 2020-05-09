class CurrentTurn extends React.Component {

  renderAttackersTurn() {
    return <div>
      <span className="current-turn">Attackers Turn</span>
      <span className="defenders-turn-element not-current-turn">Defenders Turn</span>
    </div>
  }

  renderDefendersTurn() {
    return <div>
      <span className="not-current-turn">Attackers Turn</span>
      <span className="defenders-turn-element current-turn">Defenders Turn</span>
    </div>
  }

  renderTurnStatus(attackersTurn) {
    if(attackersTurn) {
      return this.renderAttackersTurn();
    } else {
      return this.renderDefendersTurn();
    }
  }

  render() {
    if(this.props.attacker || this.props.defender) {
      if(this.props.kingsHealth !== 'dead' && this.props.kingsHealth !== 'escaped') {
        return <h2 className="box-background box make-it-green">
          {this.renderTurnStatus(this.props.attackersTurn)}
        </h2>
      } else {
        return <div></div>
      }
    } else {
      return <div></div>
    }
  }
}
