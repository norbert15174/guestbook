import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environment";

export const appGuards: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  let cookieService = inject(CookieService);
  let router = inject(Router);

  let cookie = cookieService.get("JNW.CODE");
  if (!cookie || cookie !== environment.code) {
    return true;
  }

  router.navigate(['/book']).then(() => true);
  return false;
}
