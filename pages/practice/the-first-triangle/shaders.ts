export const Vertext = `
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1);
}
`;

export const Fragement = `
void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
}
`;
