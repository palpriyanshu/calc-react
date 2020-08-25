import React from 'react';

const numbers = [...Array(10).keys()];
const functionKeys = ['+', '-', 'x', '÷', '%'];

const Button = (props) => <div className={props.className}>{props.name}</div>;

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
  }

  onNumberClick(e) {
    const { handleNumberClick } = this.props.clickHandlers();
    handleNumberClick(e.target.innerText);
  }

  onSymbolClick(e) {
    const { handleSymbolClick } = this.props.clickHandlers();
    handleSymbolClick(e.target.innerText);
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
        <div className="button" onClick={() => {}}>
          =
        </div>
        {this.createKeyboardBtn(numbers, this.onNumberClick)}
        {this.createKeyboardBtn(functionKeys, this.onSymbolClick)};
      </div>
    );
  }
}

export default Keyboard;
