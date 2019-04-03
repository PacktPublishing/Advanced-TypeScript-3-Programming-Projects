import { Component, OnInit } from '@angular/core';
import {OauthAuthorizationService} from "../../services/oauth-authorization.service";

@Component({
  selector: 'atp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: OauthAuthorizationService) {
  }

  ngOnInit() {
  }
}
