import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getWebGLContext } from "../../utils/webgl";

interface Props {
	width: number;
	height: number;
	onInit: (context: WebGLRenderingContext) => void;
}

const WebGLCanvas = (props: Props) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		try {
			const context = getWebGLContext(canvas.current);
			context && props.onInit(context);
		} catch (err) {
			err instanceof Error && setErrorMessage(err.message);
		}
	}, [props]);

	if (errorMessage) {
		return <ErrorMessage>Error: {errorMessage}</ErrorMessage>;
	}

	return (
		<Wrapper>
			<canvas width={props.width} height={props.height} ref={canvas}></canvas>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	& canvas {
		border: 2px solid green;
	}
`;
const ErrorMessage = styled.div`
	padding: 1rem;
	color: white;
	background: tomato;
`;
export default WebGLCanvas;
