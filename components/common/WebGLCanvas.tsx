import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getWebGLContext } from "../../utils/webgl";

interface Props {
	fixedDimension?: { width: number; height: number };
	onInit: WebGLCanvasInit;
}

const WebGLCanvas = ({ onInit, fixedDimension }: Props) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		try {
			const context = getWebGLContext(canvas.current);
			context && onInit(context);
		} catch (err) {
			err instanceof Error && setErrorMessage(err.message);
		}
	}, [onInit]);

	if (errorMessage) {
		return <ErrorMessage>Error: {errorMessage}</ErrorMessage>;
	}

	return (
		<Wrapper
			style={
				fixedDimension && {
					width: `${fixedDimension.width}px`,
					height: `${fixedDimension.height}px`,
				}
			}
		>
			<canvas ref={canvas}></canvas>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	& canvas {
		width: 100%;
		height: 100%;
		background: white;
	}
`;
const ErrorMessage = styled.div`
	padding: 1rem;
	color: white;
	background: tomato;
`;
export default WebGLCanvas;
