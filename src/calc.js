import React from 'react';

const numbers = [...Array(10).keys()];
const functionKeys = ['+', '-', 'x', '÷', '%'];

const Display = (props) => <div className="display">{props.number}</div>;
const Button = (props) => <div className={props.className}>{props.name}</div>;

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSymbolClick = this.handleSymbolClick.bind(this);
  }

  handleNumberClick(e) {
    const {setDisplayState, setNumberState} = this.props.clickHandlers();
    const value = e.target.innerText;
    setDisplayState(value);
    setNumberState(value);
  }

  handleSymbolClick(e) {
    const {
      setDisplayState,
      setNumber,
      setSymbol,
    } = this.props.clickHandlers();
    const value = e.target.innerText;
    setDisplayState(value);
    setNumber();
    setSymbol(value);
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
        {this.createKeyboardBtn(numbers, this.handleNumberClick)}
        {this.createKeyboardBtn(functionKeys, this.handleSymbolClick)};
      </div>
    );
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currDisplayState: '0',
      currNumberState: '',
      numbers: [],
      symbols: [],
      answer: null,
    };
    this.setDisplayState = this.setDisplayState.bind(this);
    this.setNumberState = this.setNumberState.bind(this);
    this.setNumber = this.setNumber.bind(this);
    this.setSymbol = this.setSymbol.bind(this);
    this.setForAnswer = this.setForAnswer.bind(this);
    this.clickHandlers = this.clickHandlers.bind(this);
  }

  setDisplayState(keyPressed) {
    this.setState((state) => {
      const { currDisplayState } = state;
      const newState =
        currDisplayState === '0' ? keyPressed : currDisplayState + keyPressed;
      return { currDisplayState: newState };
    });
  }

  setNumberState(keyPressed) {
    this.setState((state) => {
      const { currNumberState } = state;
      return { currNumberState: currNumberState + keyPressed };
    });
  }

  setNumber() {
    this.setState((state) => {
      const number = state.currNumberState;
      const numbers = number
        ? state.numbers.concat([Number(number)])
        : state.numbers;
      return { numbers , currNumberState :''};
    });
  }

  setSymbol(symbolPressed) {
    this.setState((state) => {
      const { symbols, numbers ,currDisplayState} = state;
      if (symbols.length >= numbers.length) {
        return { symbols: symbols.slice(0, -1).concat([symbolPressed]),currDisplayState:currDisplayState.slice(0,-2).concat(symbolPressed)};
      }
      return { symbols: symbols.concat([symbolPressed]) };
    });
  }

  setForAnswer(answer) {
    this.setState(() => {
      return {
        currDisplayState: answer,
        currNumberState: answer,
        number: [answer],
      };
    });
  }

  clickHandlers() {
    return {
      setDisplayState: this.setDisplayState,
      setNumberState: this.setNumberState,
      setNumber: this.setNumber,
      setSymbol: this.setSymbol,
      setForAnswer: this.setForAnswer,
    };
  }

  render() {
    const { currDisplayState } = this.state;
    return (
      <div className="calc">
        <Display number={`${currDisplayState}`} />
        <Keyboard clickHandlers={this.clickHandlers} />
      </div>
    );
  }
}

export default Calc;
