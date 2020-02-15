export const environment = {
  production: true,
  authConfig: {
      issuer: 'https://login.xdbsoft.com/',
      redirectUri: window.location.origin + '/index.html',
      clientId: 'notes',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false
  },
  apiConfig: {
    url: 'https://grest.xdbsoft.com/',
    collectionName: 'notes',
    aliasName: 'alias'
  }
};
