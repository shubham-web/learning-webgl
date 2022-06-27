import type { NextPage } from "next";
import Container from "../components/common/Container";
import practiceItems from "../data/practiceItems";
import NextLink from "next/link";
import NextImage from "next/image";
import styled from "styled-components";
import { parsePracticeDate } from "../utils";
import Button from "../components/common/Button";
import Header from "../components/Header";
import Spacer from "../components/common/Spacer";
import Footer from "../components/Footer";

const Home: NextPage = () => {
	return (
		<>
			<Header />
			<Container padded>
				<p style={{ textAlign: "center" }}>
					Listed are Practice WebGL programs, I created while learning it from{" "}
					<a href="https://webglfundamentals.org/" target={"_blank"} rel="noreferrer">
						webglfundamentals.org
					</a>
					.
				</p>
				<Spacer h={"1rem"} />
				<CardList>
					{practiceItems.map((item, index) => {
						return (
							<Card key={item.folder}>
								{item.preview && (
									<Preview>
										{item.preview.endsWith("mp4") ? (
											<video
												muted
												loop
												autoPlay
												width={285}
												height={285}
												src={"/practice-items-preview/".concat(item.preview)}
											></video>
										) : (
											<NextImage
												src={"/practice-items-preview/".concat(item.preview)}
												width={285}
												height={285}
											/>
										)}
									</Preview>
								)}
								<NextLink href={`/practice/${item.folder}`} passHref>
									<Title>{item.label}</Title>
								</NextLink>
								<DateAdded suppressHydrationWarning title={item.date}>
									{parsePracticeDate(item.date)}
								</DateAdded>
								<NextLink href={`/practice/${item.folder}`} passHref>
									<Button>Open</Button>
								</NextLink>
							</Card>
						);
					})}
				</CardList>
			</Container>
			<Spacer h="2rem" />
			<Footer />
		</>
	);
};
const CardList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 2rem;
	width: 100%;
`;
const Card = styled.div`
	display: grid;
	gap: 1rem;
	border: 1px solid #30363d;
	padding: 1rem;
	background: #6e76811a;
	color: #c9d1d9;
	border-radius: 0.5rem;
	text-align: center;
`;
const Preview = styled.div`
	border-radius: 0.5rem;
	line-height: 0;
	overflow: hidden;
`;
const DateAdded = styled.span`
	color: #8b949e;
`;
const Title = styled.span`
	font-weight: bold;
	color: #58a6ff;
	cursor: pointer;
`;
export default Home;
