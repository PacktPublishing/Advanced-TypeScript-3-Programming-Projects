export class Authorization {

  public IdToken: string;
  public AccessToken: string;
  public Expired: number;
  public Email: string;

  public Clear(): void {
    this.IdToken = '';
    this.AccessToken = '';
    this.Expired = 0;
    this.Email = '';
  }

  public SetFromAuthorizationResult(authResult: any): void {
    if (authResult && authResult.accessToken && authResult.idToken) {
      console.log(authResult.idTokenPayload.email);
      this.IdToken = authResult.idToken;
      this.AccessToken = authResult.accessToken;
      this.Expired = (authResult.expiresIn * 1000) + Date.now();
      this.Email = authResult.idTokenPayload.email;
    }
  }

  public get IsAuthenticated(): boolean {
    return this.AccessToken && this.Expired > Date.now();
  }
}
