class Tile extends React.Component {

  handleColor() {
    if(this.props.kingsTile) {
      return "red";
    } else if(this.props.xCoord % 2 !== 0 && this.props.yCoord % 2 !== 0) {
      return "light";
    } else if(this.props.xCoord % 2 === 0 && this.props.yCoord % 2 === 0) {
      return "light";
    } else {
      return "dark";
    }
  }

  buildTile() {
    return <span className={"tile " + this.handleColor()}>
    </span>
  }

  render() {
    return <span onClick={() => console.log(this.props.xCoord, this.props.yCoord, this.props.kingsTile)}>
      {this.buildTile()}
    </span>
  }
}
