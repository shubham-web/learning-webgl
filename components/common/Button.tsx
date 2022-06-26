import React, { ForwardedRef, forwardRef } from "react";
import styled, { css } from "styled-components";

interface ComponentProps {
	highlighted?: boolean;
}

interface Props extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = forwardRef(function CustomButton(
	{ children, highlighted, ...props },
	ref: ForwardedRef<HTMLButtonElement>
) {
	return (
		<StyledButton highlighted={highlighted} {...props} ref={ref}>
			{children}
		</StyledButton>
	);
});

const StyledButton = styled.button<ComponentProps>`
	border: none;
	cursor: pointer;
	font-size: 0.85rem;
	font-weight: bold;
	padding: 0.8rem 1.25rem;
	color: #58a6ff;
	background: #21262d;
	border-radius: 8px;
	border: 1px solid #f0f6fc1a;

	&[disabled] {
		background-color: gray;
		cursor: not-allowed;
	}
	&:hover {
		background-color: #30363d;
	}

	${(props) =>
		props.highlighted &&
		css`
			background-color: #0366d6;
			color: white;
			&:hover {
				background-color: #005cc5;
			}
		`}
`;
export default Button;
