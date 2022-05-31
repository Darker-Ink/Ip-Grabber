const path = require('node:path');
const fs = require('node:fs');


const dirPath = (dir, routePaths) => {
    const paths = routePaths || [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const isFolder = fs.lstatSync(path.join(dir, file)).isDirectory();

        if (isFolder) {
            dirPath(path.join(dir, file), paths);
        } else {
            paths.push(path.join(dir, file));
        }
    }

    return paths;
}

const routeAppPath = (file) => {
    const routeData = require(file)

    if (routeData.path) {
        const routePath = file.substring(file.indexOf('/routes/') + 8);

        const updatedPath = path.join(routePath.substring(0, routePath.lastIndexOf('/')), routeData.path);

        return updatedPath.startsWith('/') ? updatedPath : `/${updatedPath}`;
    }
}

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, '../routes');
    const routePaths = dirPath(routesPath);

    for (const routePath of routePaths) {
        const route = require(routePath);

        if (route.path) {
            console.log(`${routeAppPath(routePath)} (${route.method.toUpperCase()})`);
            app[route.method](routeAppPath(routePath), route.middleWares || [], route.run);
        }
    }
}

module.exports = loadRoutes;