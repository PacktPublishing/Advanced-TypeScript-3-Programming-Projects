import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import {Authorization} from "./authorization";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class OauthAuthorizationService {
  auth0 = new auth0.WebAuth({
    clientID: 'IvDHHA20ZKx7zvUQWNPrMy15vLTsFxx4',
    domain: 'dev-gdhoxa3c.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid email'
  });

  private readonly authorization: Authorization;
  constructor(private router: Router, private socket: Socket) {
    this.authorization = new Authorization(socket);
  }

  public Login(): void {
    this.auth0.authorize();
  }

  public Logout(): void {
    this.authorization.Clear();
    this.auth0.logout({
      return_to: window.location.origin
    });
  }

  public CheckAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (!err) {
        this.authorization.SetFromAuthorizationResult(authResult);
        window.location.hash = '';
        this.router.navigate(['/general']);
      } else {
        this.router.navigate(['/general']);
        console.log(err);
      }
    });
  }

  public Renew(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authorization.SetFromAuthorizationResult(authResult);
      } else if (err) {
        this.Logout();
      }
    });
  }
  public get IsAuthenticated(): boolean { return this.authorization.IsAuthenticated; }
}
