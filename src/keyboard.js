import React from 'react';
import { NumericKeys, ArithmeticKeys, FunctionalKeys } from './keyboardComp';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
  }

  onNumberClick(e) {
    const { handleNumberClick } = this.props.clickHandlers;
    handleNumberClick(e.target.innerText);
  }

  onSymbolClick(e) {
    const { handleSymbolClick } = this.props.clickHandlers;
    handleSymbolClick(e.target.innerText);
  }

  render() {
    const { setDefault, showResult } = this.props.clickHandlers;
    return (
      <div className="keyboard">
        <div className="leftPanel">
          <NumericKeys onClick={this.onNumberClick} />
        </div>
        <div className="rightPanel">
          <FunctionalKeys setDefault={setDefault} showResult={showResult}/>
          <ArithmeticKeys onClick={this.onSymbolClick} />
        </div>
      </div>
    );
  }
}

export default Keyboard;
