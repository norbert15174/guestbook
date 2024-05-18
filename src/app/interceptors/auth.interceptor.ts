import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {environment} from "../../../environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(`${environment.apiUrl}/api/v1/guest`)) {
    return interceptAndAllowCredentialCookies(req, next);
  }

  return next(req);
};

function interceptAndAllowCredentialCookies(req: HttpRequest<any>, next: HttpHandlerFn) {
  const apiRequest = req.clone({
    setHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });

  return next(apiRequest);
}
