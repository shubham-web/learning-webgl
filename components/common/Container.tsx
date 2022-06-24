import React from "react";
import styled, { css } from "styled-components";

interface ComponentOptions {
	padded?: boolean;
}

interface Props extends ComponentOptions, React.HTMLAttributes<HTMLDivElement> {}

const Container: React.FC<Props> = ({ children, ...props }) => {
	return <ContainerWrapper {...props}>{children}</ContainerWrapper>;
};
const ContainerWrapper = styled.div<ComponentOptions>`
	max-width: 1320px;
	margin: 0 auto;
	${(container) =>
		container.padded &&
		css`
			padding: 1rem;
		`}
`;
export default Container;
