import React from 'react';
import { NumericKeys, ArithmeticKeys, FunctionalKeys } from './keyboardComp';

const Keyboard = function (props) {
  const { onSymbolClick, onNumberClick, setDefault, showResult, } = props.clickHandlers;
  return (
    <div className="keyboard">
      <div className="leftPanel">
        <NumericKeys onClick={onNumberClick} />
      </div>
      <div className="rightPanel">
        <FunctionalKeys setDefault={setDefault} showResult={showResult} />
        <ArithmeticKeys onClick={onSymbolClick} />
      </div>
    </div>
  );
};

export default Keyboard;
