import parseMVT from './lib/parse-mvt';
/** @typedef {import('@loaders.gl/loader-utils').LoaderObject} LoaderObject */

// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'latest';

/** @type {LoaderObject} */
export const MVTWorkerLoader = {
  id: 'mvt',
  name: 'Mapbox Vector Tile',
  version: VERSION,
  extensions: ['mvt'],
  mimeTypes: ['application/x-protobuf'],
  category: 'geometry',
  options: {
    mvt: {
      coordinates: 'local',
      layerProperty: 'layerName',
      layers: null,
      tileIndex: null,
      workerUrl: `https://unpkg.com/@loaders.gl/mvt@${VERSION}/dist/mvt-loader.worker.js`
    }
  }
};

/** @type {LoaderObject} */
export const MVTLoader = {
  ...MVTWorkerLoader,
  parse: async (arrayBuffer, options) => parseMVT(arrayBuffer, options),
  parseSync: parseMVT,
  binary: true
};
