class VictoryStatement extends React.Component {

  setWinner(kingsHealthStatus) {
    if(kingsHealthStatus === 'escaped') {
      return 'Defenders';
    } else {
      return 'Attackers';
    }
  }

  setLoser(kingsHealthStatus) {
    if(kingsHealthStatus === 'escaped') {
      return 'Attackers';
    } else {
      return 'Defenders';
    }
  }

  renderMessage(kingsHealthStatus) {
    return <div>
      <span>{this.setWinner(kingsHealthStatus)} Won</span>
      <span className="losing-team">{this.setLoser(kingsHealthStatus)} Lost</span>
    </div>
  }

  render() {
    if(this.props.kingsHealth === 'dead' || this.props.kingsHealth === 'escaped') {
      return <h2 className="victorystatement box make-it-green">
        {this.renderMessage(this.props.kingsHealth)}
      </h2>
    } else {
      return <div></div>
    }
  }
}
