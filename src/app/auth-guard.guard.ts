import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environment";

export const authGuardGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  let cookie = cookieService.get("JNW.CODE");

  if (!!cookie && cookie === environment.code) {
    return true;
  } else {
    return inject(Router).parseUrl('/code');
  }
};
