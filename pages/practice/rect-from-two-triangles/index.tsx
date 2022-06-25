import { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "../../../utils/webgl";

const RectFromTwoTriangles: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={drawTriangles} fixedDimension={{ width: 400, height: 300 }} />
		</Container>
	);
};

const Vertex = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main(){
        // convert position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert position from zeroToOne to 0 to 2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert zeroToTwo to -1 -> +1 (clip space)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;
const Fragment = `
    precision mediump float;
    uniform vec4 u_color;

    void main(){
        gl_FragColor = u_color;
    }
`;

const drawTriangles: WebGLCanvasInit = (gl) => {
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// create vertext data
	// prettier-ignore
	const position = [
        // first triangle
        0, 0,
        400, 0,
        0, 300,
        // second triangle
        400, 0,
        400, 300,
        0,300
    ];

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

	const vertexShader = createShader(gl, "VERTEX_SHADER", Vertex);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragment);

	const program = createProgram(gl, vertexShader, fragmentShader);

	const positionLocation = gl.getAttribLocation(program, "a_position");
	const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
	const colorUniformLocation = gl.getUniformLocation(program, "u_color");

	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

	gl.useProgram(program);

	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

	// first triangle
	gl.uniform4f(colorUniformLocation, 70 / 255, 188 / 255, 98 / 255, 1);
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	// second triangle
	gl.uniform4f(colorUniformLocation, 27 / 255, 33 / 255, 57 / 255, 1);
	gl.drawArrays(gl.TRIANGLES, 3, 6);
};

export default RectFromTwoTriangles;
