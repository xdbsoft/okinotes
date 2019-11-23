import { AuthConfig } from 'angular-oauth2-oidc';
 
// export const authConfig: AuthConfig = {
//   issuer: 'https://login.okiapps.com/',
//   redirectUri: window.location.origin + '/index.html',
//   clientId: 'notes',
//   scope: 'openid profile email',
//   strictDiscoveryDocumentValidation: false
// }

export const authConfig: AuthConfig = {
  issuer: 'http://127.0.0.1:5556/dex',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'notes',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  requireHttps : false,
  showDebugInformation: true,
  silentRefreshShowIFrame: true
}