import React from 'react';

const numbers = [...Array(10).keys()];
const functionKeys = ['+', '-', '*', '/', '%'];

const Button = (props) => (
  <div className={props.className} onClick={props.onClick}>
    {props.name}
  </div>
);

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
    this.onAskedResult = this.onAskedResult.bind(this);
  }

  onNumberClick(e) {
    const { handleNumberClick } = this.props.clickHandlers();
    handleNumberClick(e.target.innerText);
  }

  onSymbolClick(e) {
    const { handleSymbolClick } = this.props.clickHandlers();
    handleSymbolClick(e.target.innerText);
  }

  onAskedResult(e) {
    const { handleEval } = this.props.clickHandlers();
    handleEval();
  }

  createKeyboardBtn(keys, handleClick) {
    return keys.map((key) => (
      <div className="button" key={key} onClick={handleClick}>
        {key}
      </div>
    ));
  }

  render() {
    return (
      <div className="keyboard">
        <Button className="button clrBtn" name="clr" />
        <Button className="button delBtn" name="del" />
        <Button
          className="button evalBtn"
          name="="
          onClick={this.onAskedResult}
        />
        {this.createKeyboardBtn(numbers, this.onNumberClick)}
        {this.createKeyboardBtn(functionKeys, this.onSymbolClick)}
      </div>
    );
  }
}

export default Keyboard;
