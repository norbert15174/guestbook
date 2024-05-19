import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {environment} from "../../../environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(environment.apiUrl);
  if (req.url.startsWith(`${environment.apiUrl}/api/v1`)) {
    return interceptAndAllowCredentialCookies(req, next);
  }

  return next(req);
};

function interceptAndAllowCredentialCookies(req: HttpRequest<any>, next: HttpHandlerFn) {
  const apiRequest = req.clone({
    withCredentials: true,
  });

  return next(apiRequest);
}
