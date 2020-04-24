class Game extends React.Component {

  buildBoard() {
    return <div>
      <Board/>
    </div>
  }

  render() {
    return <div>
      {this.buildBoard()}
    </div>
  }  
}
