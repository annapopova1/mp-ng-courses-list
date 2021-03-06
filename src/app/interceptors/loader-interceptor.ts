import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { LoaderService } from "../core/loader/loader.service";

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.activate();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.cancel())
    );
  }
}