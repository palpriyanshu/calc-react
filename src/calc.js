import React from 'react';
import Keyboard from './keyboard';
import Display from './display';

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
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSymbolClick = this.handleSymbolClick.bind(this);
    this.clickHandlers = this.clickHandlers.bind(this);
  }

  handleNumberClick(number) {
    this.setDisplayState(number);
    this.setNumberState(number);
  }

  handleSymbolClick(symbol) {
    this.setDisplayState(symbol);
    this.setNumber();
    this.setSymbol(symbol);
  }

  setDisplayState(pressedKey) {
    this.setState((state) => {
      const { currDisplayState } = state;
      const newState =
        currDisplayState === '0' ? pressedKey : currDisplayState + pressedKey;
      return { currDisplayState: newState };
    });
  }

  setNumberState(number) {
    this.setState((state) => {
      const { currNumberState } = state;
      return { currNumberState: currNumberState + number };
    });
  }

  setNumber() {
    this.setState((state) => {
      const number = state.currNumberState;
      const numbers = number
        ? state.numbers.concat([Number(number)])
        : state.numbers;
      return { numbers, currNumberState: '' };
    });
  }

  setSymbol(symbolPressed) {
    this.setState((state) => {
      const { symbols, numbers, currDisplayState } = state;
      if (symbols.length >= numbers.length) {
        return {
          symbols: symbols.slice(0, -1).concat([symbolPressed]),
          currDisplayState: currDisplayState.slice(0, -2).concat(symbolPressed),
        };
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
      handleNumberClick: this.handleNumberClick,
      handleSymbolClick: this.handleSymbolClick,
    };
  }

  render() {
    const { currDisplayState } = this.state;
    return (
      <div className="calc">
        <Display expression={`${currDisplayState}`} />
        <Keyboard clickHandlers={this.clickHandlers} />
      </div>
    );
  }
}

export default Calc;
