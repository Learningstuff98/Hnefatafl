class TeamForm extends React.Component {

  componentDidMount() {
    this.props.getGameInfo();
  }

  setUserAsAttacker() {
    axios.patch(this.props.root_with_game_instance, {
      attacker: this.props.current_user.username
    })
    .catch((err) => console.log(err.response.data));
  }

  setUserAsDefender() {
    axios.patch(this.props.root_with_game_instance, {
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

  handleSettingNewUserAsDefender(attacker, username) {
    if(attacker !== username) {
      this.setUserAsDefender();
    }
  }

  handleSettingNewUserAsAttacker(defender, username) {
    if(defender !== username) {
      this.setUserAsAttacker();
    }
  }

  handleAssignments(attacker, defender, username) {
    if(!attacker && !defender) {
      return this.setOptions();
    } else if(attacker && !defender) {
      this.handleSettingNewUserAsDefender(attacker, username);
    } else if(!attacker && defender) {
      this.handleSettingNewUserAsAttacker(defender, username);
    }
  }

  render() {
    return <div>
      {this.handleAssignments(
        this.props.attacker,
        this.props.defender,
        this.props.current_user.username
      )}
    </div>
  }
}
