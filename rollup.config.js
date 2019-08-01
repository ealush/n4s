import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
const { version } = require('./package.json');

const output = {
    name: 'enforce',
    format: 'umd'
};

const plugins = [
    resolve(),
    babel(),
    replace({
        ENFORCE_VERSION: JSON.stringify(version)
    })
];

export default [{
    input: 'src/index.js',
    output: {
        file: 'dist/n4s.js',
        ...output
    },
    plugins
},
{
    input: 'src/index.js',
    output: {
        file: 'dist/n4s.min.js',
        ...output
    },
    plugins: [
        ...plugins,
        terser()
    ]
}];
