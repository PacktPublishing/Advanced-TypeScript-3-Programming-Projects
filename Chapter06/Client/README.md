# Client notes

This application uses Auth0 to provide authentication. While there is a sample endpoint in oauth-authorization.service.ts, this is not live details so you will need to supply your own. In the book, I talk about how you need to sign up to the Auth0 but this is a quick recap.

When you have signed up, you will need to copy your client id and replace the clientID entry with the one you create. You may also need to replace the domain with the Auth0 domain if you are using a different location.

In Auth0, you will also need to set up the Allowed Callbacks URL, this is not provided for you - here I have defaulted this to http://localhost:4200/callback in the redirectUrl in the authorization service. If you change this to a different endpoint, you must change the value in both the redirectUrl AND the authorization service.

When you log out of Auth0, Auth0 needs to know where to redirect you to. You supply this value in the Allowed Logout URLs. I typically default this back to the application default page.