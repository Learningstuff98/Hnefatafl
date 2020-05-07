class CurrentTurn extends React.Component {
  render() {
    if(this.props.attackersTurn) {
      return <div>
        Attackers Turn
      </div>
    } else {
      return <div>
        Defenders Turn
      </div>
    }
  }  
}
