# About the Firebase settings

While I have provided a set of default values in environment.ts, this is a placeholder only because this referred to settings I used when I set up the application. You need to follow the instructions to sign up to Firebase.

Note, if you cannot save to the database - open the Browser debug console window - if this is telling you that you have a Firebase permission exception, it means that you have signed up in locked mode and not test mode. Fixing this is simple enough - all you need to do is open up the Firebase Console and select Database > Rules. Make sure they match this:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
