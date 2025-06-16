
import { useState } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { Card } from "@/components/ui/card";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-xl border-white/10 shadow-2xl">
      {/* Display */}
      <div className="mb-6 p-4 bg-black/30 rounded-lg border border-white/10">
        <div className="text-right text-4xl font-light text-white font-mono tracking-wider overflow-hidden">
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton 
          onClick={clear}
          className="bg-gray-600 hover:bg-gray-500 text-white"
          variant="secondary"
        >
          AC
        </CalculatorButton>
        <CalculatorButton 
          onClick={handlePlusMinus}
          className="bg-gray-600 hover:bg-gray-500 text-white"
          variant="secondary"
        >
          ±
        </CalculatorButton>
        <CalculatorButton 
          onClick={handlePercentage}
          className="bg-gray-600 hover:bg-gray-500 text-white"
          variant="secondary"
        >
          %
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation("÷")}
          className="bg-orange-500 hover:bg-orange-400 text-white"
          variant="operator"
        >
          ÷
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber("7")}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("8")}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("9")}>9</CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation("×")}
          className="bg-orange-500 hover:bg-orange-400 text-white"
          variant="operator"
        >
          ×
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber("4")}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("5")}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("6")}>6</CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation("-")}
          className="bg-orange-500 hover:bg-orange-400 text-white"
          variant="operator"
        >
          -
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber("1")}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("2")}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("3")}>3</CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation("+")}
          className="bg-orange-500 hover:bg-orange-400 text-white"
          variant="operator"
        >
          +
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton 
          onClick={() => inputNumber("0")}
          className="col-span-2"
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
        <CalculatorButton 
          onClick={handleEquals}
          className="bg-orange-500 hover:bg-orange-400 text-white"
          variant="operator"
        >
          =
        </CalculatorButton>
      </div>
    </Card>
  );
};

export default Calculator;
