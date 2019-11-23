import { Injectable, Optional } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { OAuthStorage, OAuthResourceServerErrorHandler, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    constructor(
        private authStorage: OAuthStorage,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig
    ) {
    }
    
    private checkUrl(url: string): boolean {

        if (this.moduleConfig.resourceServer.customUrlValidation) {
            return this.moduleConfig.resourceServer.customUrlValidation(url);
        }

        if (this.moduleConfig.resourceServer.allowedUrls) {
            return !!this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
        }

        return true;
    }
    
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let url = req.url.toLowerCase();

        if (!this.moduleConfig) return next.handle(req);
        if (!this.moduleConfig.resourceServer) return next.handle(req);
        if (this.moduleConfig.resourceServer.allowedUrls && !this.checkUrl(url)) return next.handle(req);

        const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

        if (sendAccessToken) {

            let token = this.authStorage.getItem('id_token');
            if (token)
            {
                let header = 'Bearer ' + token;
    
                let headers = req.headers
                                    .set('Authorization', header);
    
                req = req.clone({ headers });
            }
        }

        return next
            .handle(req)
            .pipe(catchError(err => this.errorHandler.handleError(err)));

    }

}
