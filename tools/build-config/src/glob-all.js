const { sync: globSync } = require('glob');
const path = require('path');

module.exports = function globAll(pattern = 'src/**/*.ts') {
    const files = globSync(pattern);

    const entry = Object.fromEntries(
        files.map(file => [
            // This removes `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
                'src',
                file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            file,
            // fileURLToPath(new URL(file, import.meta.url))
        ])
    );

    return entry;
}