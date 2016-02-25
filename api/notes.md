

- Test story url: http://storage.yarnstudio.io/test/3rocks.yarn.txt
- Angular Client : http://localhost:3000/js/lb-services.js


<script src="http://localhost:3000/js/lb-services.js"></script>


- Address for the twitter auth: http://localhost:3000/auth/twitter


- App is hosted on demo.yarnstudio.io
- Api is hosted on api.yarnstudio.io
- CORS is configured on the api

# Sequence for auth
- App checks if there is a valid credentials by asking the API ???

- No credentials are present
- User is show an overlay telling him he must login using Twitter
- User clicks "Login with Twitter" and is redirected to the login gateway
- User approves via twitter if needed
- User is redirected back to the App
- App checks again if there is a valid credentials in the localStorage
- Credentials are found
- App starts using the api
