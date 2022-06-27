import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
	center?: boolean;
	children: ReactNode;
}
const P: React.FC<Props> = ({ center, children }) => {
	return <Wrapper {...{ center }}>{children}</Wrapper>;
};

const Wrapper = styled.p<Props>`
	text-align: ${(props) => (props.center ? "center" : "left")};
`;

export default P;
