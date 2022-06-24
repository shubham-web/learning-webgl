import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function LearningWebGL({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Learning WebGL</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default LearningWebGL;
