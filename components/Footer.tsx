import styled from "styled-components";
import Button from "./common/Button";
import NextLink from "next/link";
import Flex from "./common/Flex";
import GitHubButton from "react-github-btn";
import ZeroLineHeight from "./common/ZeroLineHeight";
const Footer: React.FC = () => {
	return (
		<Wrapper>
			<Title>
				Made for Fun by &nbsp;
				<a href="https://shubhamp.dev/">Shubham Prajapat</a>
			</Title>
			<Flex center gap="1rem">
				<ZeroLineHeight>
					<a href="https://x.com/shubhamp_web">Follow @shubhamp_web on X</a>
				</ZeroLineHeight>
			</Flex>
		</Wrapper>
	);
};
const Wrapper = styled.footer`
	display: flex;
	padding: 2rem 3rem;
	color: #ffffff80;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	border-top: 1px solid #21262d;
`;
const Title = styled.h1`
	font-size: 1rem;
	font-weight: normal;
	margin: 0;
`;

export default Footer;
