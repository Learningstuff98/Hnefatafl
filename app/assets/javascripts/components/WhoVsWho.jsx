class WhoVsWho extends React.Component {

  setUserNames(attacker, defender) {
    return <div>
      <div>{"Attacker: " + attacker}</div>
      <div>{"Defender: " + defender}</div>
    </div>
  }

  render() {
    return <h2 className="box-background box make-it-green">
      {this.setUserNames(this.props.attacker, this.props.defender)}
    </h2>
  }  
}
