import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { terser } from 'rollup-plugin-terser';

const DEFAULT_FORMAT = 'umd';
const LIBRARY_NAME_N4S = 'n4s';
const LIBRARY_NAME_ENFORCE = 'enforce';
const LIBRARY_NAME_ENSURE = 'ensure';

const pluginList = ({ libraryName } = {}) => [
    resolve(),
    compiler(),
    replace({
        LIBRARY_NAME: JSON.stringify(libraryName || LIBRARY_NAME_N4S)
    })
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
        ? [ ...pluginList({ libraryName: name }), terser() ]
        : pluginList({ libraryName: name })
});

const genConfig = ({ name } = {}) => [ buildConfig({ name }), buildConfig({name, min: true}) ];

export default [
    ...genConfig({ name: LIBRARY_NAME_ENFORCE }),
    ...genConfig({ name: LIBRARY_NAME_ENSURE }),
    ...genConfig()
];
