import type { NextPage } from "next";
import Container from "../components/common/Container";
import practiceItems from "../data/practiceItems";
import NextLink from "next/link";
import NextImage from "next/image";
import styled from "styled-components";
import { parsePracticeDate } from "../utils";

const Home: NextPage = () => {
	return (
		<Container padded>
			<CardList>
				{practiceItems.map((item, index) => {
					return (
						<Card key={item.folder}>
							{item.preview && (
								<Preview>
									<NextImage
										src={"/images/practice-items-preview/".concat(item.preview)}
										width={300}
										height={300}
									/>
								</Preview>
							)}
							<h3>{item.label}</h3>
							<p>{parsePracticeDate(item.date).toDateString()}</p>
							<NextLink href={`/practice/${item.folder}`}>Open</NextLink>
						</Card>
					);
				})}
			</CardList>
		</Container>
	);
};
const CardList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.25rem;
	width: 100%;
`;
const Card = styled.div`
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	padding: 1rem;
	border-radius: 0.5rem;
	text-align: center;
`;
const Preview = styled.div`
	background: #f7f7f7;
	border-radius: 0.5rem;
`;

export default Home;
