class TeamForm extends React.Component {

  componentDidMount() {
    this.props.getGameInfo();
  }

  setUserAsAttacker() {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id, {
      attacker: this.props.current_user.username
    })
    .catch((err) => console.log(err.response.data));
  }

  setUserAsDefender() {
    axios.patch(this.props.setRoot() + '/games/' + this.props.game_id, {
      defender: this.props.current_user.username
    })
    .catch((err) => console.log(err.response.data));
  }

  setOptions() {
    return <h2 className="box-background box make-it-green">
      <span onClick={() => this.setUserAsAttacker()} className="cursor">Attackers</span>
      <span onClick={() => this.setUserAsDefender()} className="defenders-option cursor">Defenders</span>
    </h2>
  }

  handleSettingNewUserAsDefender() {
    if(this.props.attacker !== this.props.current_user.username) {
      this.setUserAsDefender();
    }
  }

  handleSettingNewUserAsAttacker() {
    if(this.props.defender !== this.props.current_user.username) {
      this.setUserAsAttacker();
    }
  }

  handleAssignments() {
    if(!this.props.attacker && !this.props.defender) {
      return this.setOptions();
    } else if(this.props.attacker && !this.props.defender) {
      this.handleSettingNewUserAsDefender();
    } else if(!this.props.attacker && this.props.defender) {
      this.handleSettingNewUserAsAttacker();
    }
  }

  render() {
    return <div>
      {this.handleAssignments()}
    </div>
  }
}
