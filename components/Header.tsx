import styled from "styled-components";
import Button from "./common/Button";
import NextLink from "next/link";
import Flex from "./common/Flex";
import GitHubButton from "react-github-btn";
import ZeroLineHeight from "./common/ZeroLineHeight";
const Header: React.FC = () => {
	return (
		<Wrapper>
			<Title>Learning WebGL</Title>
			<Flex center gap="1rem">
				<ZeroLineHeight>
					<GitHubButton
						href="https://github.com/shubham-web/learning-webgl/issues"
						data-icon="octicon-issue-opened"
						data-size="large"
						data-show-count="true"
						aria-label="Issue shubham-web/learning-webgl on GitHub"
						data-color-scheme="no-preference: dark; light: dark; dark: dark;"
					>
						Issue
					</GitHubButton>
				</ZeroLineHeight>
				<ZeroLineHeight>
					<GitHubButton
						href="https://github.com/shubham-web/learning-webgl"
						data-icon="octicon-star"
						data-size="large"
						data-show-count="true"
						aria-label="Star shubham-web/learning-webgl on GitHub"
						data-color-scheme="no-preference: dark; light: dark; dark: dark;"
					>
						Star
					</GitHubButton>
				</ZeroLineHeight>
				<NextLink href="https://github.com/shubham-web/learning-webgl" passHref>
					<Button highlighted>View on GitHub</Button>
				</NextLink>
			</Flex>
		</Wrapper>
	);
};
const Wrapper = styled.header`
	display: flex;
	background: #161b22;
	padding: 1rem 3rem;
	color: #ffffff;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;
const Title = styled.h1`
	font-size: 1.85rem;
	font-weight: normal;
	margin: 0;
`;

export default Header;
