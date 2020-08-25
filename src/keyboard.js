import React from 'react';
import { Button, NumericKeys, OperationalKeys } from './buttons';

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
          <div className="topRightPanel">
            <Button className="button clrBtn" name="clr" onClick={setDefault} />
            <Button className="button evalBtn" name="=" onClick={showResult} />
          </div>
          <OperationalKeys onClick={this.onSymbolClick} />
        </div>
      </div>
    );
  }
}

export default Keyboard;
