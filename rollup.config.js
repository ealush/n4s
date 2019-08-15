import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const DEFAULT_FORMAT = 'umd';
const LIBRARY_NAME_N4S = 'n4s';
const LIBRARY_NAME_ENFORCE = 'enforce';
const LIBRARY_NAME_ENSURE = 'ensure';


const PLUGINS = [
    resolve(),
    babel()
];

const buildConfig = ({ format = DEFAULT_FORMAT, min = false, name = '' } = {}) => ({
    input: path.join('./src', name || '', 'index.js'),
    output: {
        name: name || LIBRARY_NAME_ENFORCE,
        format,
        file: [
            `dist/${ name || LIBRARY_NAME_N4S }`,
            min && 'min',
            format !== DEFAULT_FORMAT && format,
            'js'
        ].filter(Boolean).join('.')
    },
    plugins: min
        ? [ ...PLUGINS, terser() ]
        : PLUGINS
});

const genConfig = ({ name } = {}) => [ buildConfig({ name }), buildConfig({name, min: true}) ];

export default [
    ...genConfig({ name: LIBRARY_NAME_ENFORCE }),
    ...genConfig({ name: LIBRARY_NAME_ENSURE }),
    ...genConfig()
];
