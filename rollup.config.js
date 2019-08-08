import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const DEFAULT_FORMAT = 'umd';

const PLUGINS = [
    resolve(),
    babel()
];

const buildConfig = ({ format = DEFAULT_FORMAT, min = false } = {}) => ({
    input: './src/index.js',
    output: {
        name: 'enforce',
        format,
        file: [
            'dist/n4s',
            min && 'min',
            format !== DEFAULT_FORMAT && format,
            'js'
        ].filter(Boolean).join('.')
    },
    plugins: min
        ? [ ...PLUGINS, terser() ]
        : PLUGINS
});

export default [
    buildConfig(),
    buildConfig({ min: true })
];
