import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
	center?: boolean;
	hCenter?: boolean;
	vCenter?: boolean;
	gap: string;
	children: ReactNode;
}
const Flex: React.FC<Props> = ({ center, hCenter, vCenter, gap, children }) => {
	return <FlexContainer {...{ center, hCenter, vCenter, gap }}>{children}</FlexContainer>;
};

const FlexContainer = styled.div<Props>`
	display: flex;
	gap: ${(props) => props.gap};
	justify-content: ${(props) => (props.center || props.hCenter ? "center" : "flex-start")};
	align-items: ${(props) => (props.center || props.vCenter ? "center" : "flex-start")};
`;

export default Flex;
