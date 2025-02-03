import * as readlineSync from "readline-sync";

type Operator = "+" | "-" | "x" | "/";

interface MathOperation {
  (a: number, b: number): number;
}

class Calculator {
  private readonly operations: Record<Operator, MathOperation> = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  private isValidOperator(operator: string): operator is Operator {
    return ["+", "-", "x", "/"].includes(operator);
  }

  private getNumber(prompt: string): number {
    while (true) {
      const input = readlineSync.question(prompt);
      const number = parseFloat(input);

      if (!isNaN(number)) {
        return number;
      }
      console.log("Please input valid numbers.");
    }
  }

  private getOperator(): Operator {
    while (true) {
      const operator = readlineSync.question("Choose Operator (+, -, x, /) : ");

      if (this.isValidOperator(operator)) {
        return operator;
      }
      console.log("Invalid operator. Please choose one of +, -, x, /");
    }
  }

  private getSecondNumber(operator: Operator): number {
    while (true) {
      const number = this.getNumber("Second Number : ");

      if (operator === "/" && number === 0) {
        console.log(
          "Division by zero is not allowed. Please enter a non-zero second number."
        );
        continue;
      }
      return number;
    }
  }

  public calculate(): void {
    try {
      const operator = this.getOperator();
      const firstNumber = this.getNumber("First Number : ");
      const secondNumber = this.getSecondNumber(operator);

      const operation = this.operations[operator];
      const result = operation(firstNumber, secondNumber);

      console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    } catch (error) {
      console.error(
        "Unexpected error occurred:",
        error instanceof Error ? error.message : "Unknown errors"
      );
    }
  }
}

function main(): void {
  const calculator = new Calculator();
  calculator.calculate();
}

main();
