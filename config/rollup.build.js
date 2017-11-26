import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input: 'src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'cjs'
    },
    plugins: [
        vue({ css: true }),
        resolve({
            module: true, // Default: true
            jsnext: true,  // Default: false
            main: true,  // Default: true
            browser: true,  // Default: false
            extensions: [ '.js', '.json' , '.vue'],  // Default: ['.js']
            preferBuiltins: false,  // Default: true
            modulesOnly: true, // Default: false
          })
    ]
}
