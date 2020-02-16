import React from "react";

import Row from "./components/Row";
import Display from "./components/Display";
import Button from "./components/Button";

export default class Calculator extends React.Component {
	state = {
		op1: { text: "", isDecimal: false, sign: 1 },
		op2: { text: "", isDecimal: false, sign: 1 },
		operator: "",
		invalid: false,
		hasPreviousAnswer: false
	};
	initialState = JSON.stringify(this.state);
	getOperandNumericalVal = op => {
		if (/^.{1}$/.test(op.text) || !op.text) return op.text;
		else {
			return (
				(op.isDecimal ? parseFloat(op.text) : parseInt(op.text)) * op.sign
			).toString();
		}
	};
	updateOperand = char => {
		this.setState(state => {
			if (state.operator) {
				state.op2.text += char;
			} else {
				if (state.hasPreviousAnswer) {
					state.hasPreviousAnswer = false;
					state.op1.text = "";
				}
				state.op1.text += char;
			}
			return state;
		});
	};
	updateOperator = char => {
		this.setState({ operator: char });
	};
	calculations = {
		"+": (first, second) => first + second,
		"-": (first, second) => first - second
	};
	calculate = () => {
		if (
			Object.prototype.hasOwnProperty.call(
				this.calculations,
				this.state.operator
			)
		) {
			this.setState(state => {
				const first = Number(state.op1.text) * state.op1.sign;
				const second = Number(state.op2.text) * state.op2.sign;
				const result = this.calculations[this.state.operator](first, second);
				// result will be stored in operand 1
				state.op1.text = Math.abs(result).toString();
				state.op1.sign = result >= 0 ? 1 : -1;
				state.op1.isDecimal = /.{1}/.test(state.op1.text);
				// reset operand 2 and operator
				state.op2.isDecimal = false;
				state.op2.sign = 1;
				state.op2.text = "";
				state.operator = "";
				state.hasPreviousAnswer = true;
				return state;
			});
		}
	};
	// Handle input of decimal dot and change decimal state
	addDecimalDot = char => {
		this.setState(state => {
			if (state.operator) {
				state.op2.text += state.op2.isDecimal ? "" : char;
				state.op2.isDecimal = true;
			} else {
				state.op1.text += state.op1.isDecimal ? "" : char;
				state.op1.isDecimal = true;
			}
			return state;
		});
	};
	negate = () => {
		this.setState(state => {
			if (state.operator) {
				state.op2.sign *= -1;
			} else {
				state.op1.sign *= -1;
			}
			return state;
		});
	};
	clear = () => {
		this.setState(JSON.parse(this.initialState));
	};
	backSpace = () => {
		this.setState(state => {
			if (state.operator) {
				const len = state.op2.text.length;
				// change decimal state while deleting a dot
				const isAtDot = state.op2.text.charAt(len - 1) === ".";
				if (isAtDot) {
					state.op2.isDecimal = false;
				}
				state.op2.text = state.op2.text.substring(
					0,
					isAtDot ? len - 2 : len - 1
				);
			} else {
				const len = state.op1.text.length;
				// change decimal state while deleting a dot
				const isAtDot = state.op1.text.charAt(len - 1) === ".";
				if (isAtDot) {
					state.op1.isDecimal = false;
				}
				state.op1.text = state.op1.text.substring(
					0,
					isAtDot ? len - 2 : len - 1
				);
			}
			return state;
		});
	};
	render() {
		return (
			<div className="calc">
				<Row>
					<Display
						val={
							this.state.operator
								? this.getOperandNumericalVal(this.state.op2)
								: this.getOperandNumericalVal(this.state.op1)
						}
					/>
				</Row>
				<Row>
					<Button handler={this.clear}>Clear</Button>
					<Button handler={this.backSpace}>←</Button>
					<Button disabled={true} />
					<Button handler={this.updateOperator}>+</Button>
				</Row>
				<Row>
					<Button handler={this.updateOperand}>7</Button>
					<Button handler={this.updateOperand}>8</Button>
					<Button handler={this.updateOperand}>9</Button>
					<Button handler={this.updateOperator}>-</Button>
				</Row>
				<Row>
					<Button handler={this.updateOperand}>4</Button>
					<Button handler={this.updateOperand}>5</Button>
					<Button handler={this.updateOperand}>6</Button>
					<Button>×</Button>
				</Row>
				<Row>
					<Button handler={this.updateOperand}>1</Button>
					<Button handler={this.updateOperand}>2</Button>
					<Button handler={this.updateOperand}>3</Button>
					<Button>÷</Button>
				</Row>
				<Row>
					<Button handler={this.updateOperand}>0</Button>
					<Button handler={this.negate}>+/-</Button>
					<Button handler={this.addDecimalDot}>.</Button>
					<Button handler={this.calculate}>=</Button>
				</Row>
			</div>
		);
	}
}
