import { AuthConfig } from 'angular-oauth2-oidc';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authConfig: {
    issuer: 'http://127.0.0.1:5556/dex',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'notes',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    requireHttps : false,
    showDebugInformation: true,
    silentRefreshShowIFrame: true
  },
  apiConfig: {
    url: 'http://localhost:9889/',
    collectionName: 'notes',
    aliasName: 'alias'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
