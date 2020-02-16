import React from "react";

export default class Button extends React.Component {
	forceSpace() {
		return;
	}

	render() {
		const { handler, children } = this.props;
		return (
			<button
				className="calc-button"
				onClick={() => {
					if (handler) handler(children);
				}}
				disabled={this.props.disabled}
			>
				{this.props.disabled ? "\u00a0" : this.props.children}
			</button>
		);
	}
}
