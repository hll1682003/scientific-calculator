import React from "react";
import { Button as CalculatorButton } from "@material-ui/core";
export default class Button extends React.Component {
	forceSpace() {
		return;
	}

	render() {
		const { handler, children } = this.props;
		const isDigit = /^\d{1}$/.test(children);
		const isEqualSign = /^={1}$/.test(children);
		return (
			<CalculatorButton
				variant={isDigit ? "outlined" : "contained"}
				color={isEqualSign ? "secondary" : "primary"}
				className="calc-button"
				onClick={() => {
					if (handler) handler(children);
				}}
				disabled={this.props.disabled}
			>
				{this.props.disabled ? "\u00a0" : this.props.children}
			</CalculatorButton>
		);
	}
}
