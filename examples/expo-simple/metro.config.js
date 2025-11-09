/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const packageRoot = path.resolve(__dirname, '../../packages');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Add packages directory to watch folders
config.watchFolders = [packageRoot];

// Cache for package.json files
const packageJsonCache = new Map();

// Helper function to resolve exports field
function resolveExports(pkgJson, subpath, conditions = ['react-native', 'require', 'default']) {
  if (!pkgJson.exports) {
    return null;
  }

  const exportKey = subpath === '.' ? '.' : `./${subpath}`;
  const exportConfig = pkgJson.exports[exportKey];
  
  if (!exportConfig) {
    return null;
  }

  // Handle string export (simple case)
  if (typeof exportConfig === 'string') {
    return exportConfig;
  }

  // Handle conditional exports
  for (const condition of conditions) {
    if (exportConfig[condition]) {
      const resolved = exportConfig[condition];
      if (typeof resolved === 'string') {
        return resolved;
      }
      // Handle nested structure like { require: { default: "./file.cjs" } }
      if (resolved && typeof resolved === 'object') {
        if (resolved.default) {
          return resolved.default;
        }
        // Try to find any string value in nested structure
        for (const key in resolved) {
          if (typeof resolved[key] === 'string') {
            return resolved[key];
          }
        }
      }
    }
  }

  // Fallback to default
  if (exportConfig.default) {
    if (typeof exportConfig.default === 'string') {
      return exportConfig.default;
    }
    if (exportConfig.default.default) {
      return exportConfig.default.default;
    }
  }

  return null;
}

// Store original resolver
const originalResolveRequest = config.resolver.resolveRequest;

// Configure resolver to find packages in monorepo
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(packageRoot, '..', 'node_modules'),
  ],
  extraNodeModules: (() => {
    const extraNodeModules = {};
    // Map all @svgr-iconkit packages to their locations in the monorepo
    if (fs.existsSync(packageRoot)) {
      const packages = fs.readdirSync(packageRoot);
      packages.forEach((pkg) => {
        const pkgPath = path.join(packageRoot, pkg);
        const pkgJsonPath = path.join(pkgPath, 'package.json');
        if (fs.existsSync(pkgJsonPath)) {
          try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
            if (pkgJson.name) {
              extraNodeModules[pkgJson.name] = pkgPath;
              packageJsonCache.set(pkgJson.name, { pkgJson, pkgPath });
            }
          } catch (e) {
            // Ignore invalid package.json files
          }
        }
      });
    }
    return extraNodeModules;
  })(),
//   resolveRequest: (context, moduleName, platform) => {
//     // Handle subpath exports (e.g., @svgr-iconkit/core/native)
//     if (moduleName.startsWith('@svgr-iconkit/')) {
//       const parts = moduleName.split('/');
//       if (parts.length > 2) {
//         const packageName = parts.slice(0, 2).join('/');
//         const subpath = parts.slice(2).join('/');
        
//         const cached = packageJsonCache.get(packageName);
//         if (cached) {
//           const { pkgJson, pkgPath } = cached;
//           const resolvedPath = resolveExports(pkgJson, subpath, ['react-native', 'require', 'default']);
          
//           if (resolvedPath) {
//             const fullPath = path.resolve(pkgPath, resolvedPath);
//             if (fs.existsSync(fullPath)) {
//               return {
//                 filePath: fullPath,
//                 type: 'sourceFile',
//               };
//             }
//           }
//         }
//       }
//     }

//     // Fall back to default resolver
//   },
};

module.exports = config;