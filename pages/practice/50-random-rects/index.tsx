import { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import random from "lodash/random";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "../../../utils/webgl";

const FiftyRandomRects: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={drawRects}></WebGLCanvas>
		</Container>
	);
};

const Vertex = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    
    void main(){
        // convert pixels to 0 -> 1
        vec2 zeroToOne = a_position / u_resolution;

        // convert zertoToOne to 0 -> 2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert 0->2 to -1 -> +1
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1,-1), 0, 1);
    }
`;

const Fragment = `
    precision mediump float;

    uniform vec4 u_color;

    void main(){
        gl_FragColor = u_color;
    }
`;

const drawRects: WebGLCanvasInit = (gl) => {
	resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRatio);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	const vertexShader = createShader(gl, "VERTEX_SHADER", Vertex);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragment);

	const program = createProgram(gl, vertexShader, fragmentShader);

	const positionLocation = gl.getAttribLocation(program, "a_position");
	const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
	const colorUniformLocation = gl.getUniformLocation(program, "u_color");

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	gl.useProgram(program);

	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

	// set resolution
	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

	// draw 50 random rects
	for (let i = 0; i < 25; i++) {
		// set random rect in buffer
		setRectInBuffer(gl);

		// set random color
		gl.uniform4f(colorUniformLocation, random(255) / 255, random(255) / 255, random(255) / 255, 1);

		// draw
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
};

const setRectInBuffer = (gl: WebGLRenderingContext) => {
	let [width, height] = [random(20, gl.canvas.width / 2), random(20, gl.canvas.height / 2)];
	let x = random(gl.canvas.width) - width;
	let y = random(gl.canvas.height) - height;

	// prettier-ignore
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			// first triangle
			x, y,
            x + width, y,
            x, y + height,
			// second triangle
            x + width, y,
            x + width, y + height,
            x, y + height,
		]),
		gl.STATIC_DRAW
	);
};

export default FiftyRandomRects;
