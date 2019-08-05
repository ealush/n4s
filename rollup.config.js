import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const output = {
    name: 'enforce',
    format: 'umd'
};

const plugins = [
    resolve(),
    babel()
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
