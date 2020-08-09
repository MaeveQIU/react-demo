import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Header() {
  return <h1>Welcome to My Todo List!</h1>
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""}
  }

  handleValueChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({value: ""});
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
      <input className="textField" type="text" value={this.state.value} onChange={this.handleValueChange} />
      <input className="pressField" type="submit" value="Add!" />
    </form>)
  }
}

class CompleteButton extends React.Component {

  handleClick = (event) => {
    const style = event.target.parentNode.style;
    style.textDecoration = "line-through";
  }

  render() {
    return <button className="completeButton" onClick={this.handleClick}>✓</button>;
  }
}

class DeleteButton extends React.Component {

  handleClick = (event) => {
    this.props.onClick(event.target.previousSibling.previousSibling.innerText);
  }

  render() {
    return <button className="deleteButton" onClick={this.handleClick}>Delete</button>
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  onSubmitForm = (value) => {
    const values = this.state.items.slice();
    values.push(value);
    this.setState({items: values});
  }

  onClickDelete = (value) => {
    const values = this.state.items.slice();
    let result = values.filter(v => v !== value);
    this.setState({items: result});
  }

  render() {
    return (
      <div>
        <Input onSubmit={this.onSubmitForm}/>
        <ul>
          {this.state.items.map(item => <li key={item.toString()}>
            <span>{item}</span>
            <CompleteButton />
            <DeleteButton onClick={this.onClickDelete} />
            </li>)}
        </ul>
      </div> 
      );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Content />
      </>);
  }
}

ReactDOM.render(<App />, document.getElementById("root"));