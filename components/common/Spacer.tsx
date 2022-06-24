import styled, { css } from "styled-components";

interface Props {
	inline?: boolean;
	w?: string;
	h?: string;
	responsive?: Array<{
		maxWidth: string;
		w?: string;
		h?: string;
	}>;
}
const Spacer = styled.div<Props>`
	display: ${(props) => (props.inline ? "inline-block" : "block")};
	width: ${(props) => props.w || "auto"};
	height: ${(props) => props.h || "auto"};
	pointer-events: none;

	${(props) =>
		props.responsive &&
		props.responsive.map((data) => {
			return css`
				@media (max-width: ${data.maxWidth}) {
					width: ${data.w || props.w || "auto"};
					height: ${data.h || props.h || "auto"};
				}
			`;
		})}
`;

export default Spacer;
