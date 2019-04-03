import {Component, OnInit} from '@angular/core';
import {OauthAuthorizationService} from "./services/oauth-authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private auth: OauthAuthorizationService) {
    this.auth.CheckAuthentication();
  }

  ngOnInit() {
    if (this.auth.IsAuthenticated) {
      this.auth.Renew();
    }
  }
}
