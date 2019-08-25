# GENESIS

### 1. Philosophy

Why you should use that ?
We bilieve programming should be fun and ligth, not a stern stressful. it's cool to be cute, using serious words without explaining them does'nt make better results.
if anything is scares people off. we don't want to be scary , we want to be nice and fun, and then casually be the best around. Real casually.

### 2. Folder Structure

```

frontend/
  build
  config
  coverage
  node_module
  public/
    Locales/
     en_CA/
       translation.json
     en_US/
       translation.json
     fr_CA/
       translation.json
     fr-FR/
       translation.json
    index.html
  src/
  assets/
   fonts/
    font
   icons/
    icons.svg
   images/
    image.png
   styles/
    font.sass
    global.sass
    layout.sass
    vars.sass
   svg/
  Common/
   HOC/
    Wrappercomponent
    HomePAge
    ...
  Compoenents/
    Footer
    Header
    Navigations
    ...
  Config/
  Constants/
  Containers/
    App/
     index.js
     styles.sass
    RouterComponent/
     index.js
     styles.sass
  Services/
  index.js
  i18n.js
  i18next-scanner.config.js
  setupTests.js
  .gitignore
  package.json
  README.md
```

- public/index.html is the page template.
- src/index.js is the JavaScript entry point.
- You can delete or rename the other files, rename the javascript file as index.js, the sass file as styles.sass.
- You may create subdirectories inside src. For faster rebuilds, only files inside src are processed by Webpack.
- You can, however, create more top-level directories.
- They will not be included in the production build so you can use them for things like documentation.

### 3. Available script

In the project directory , you can run :

```
npm start
```

- Runs the app in the devellopement mode.
- Open http://localhost:3000 to view it in the browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

```
npm test
```

- Launches the test runner in the interactive watch mode.

```
npm run build
```

- Builds the app for production to the build folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

```
npm run translations-scan
```

- Generate the translation json file for all the text fields.
- this file will allowed us to translate smoothly the App.

```
npm run doc
```

- Generate the documentation for all the components.

### 4. Built With:

- This part list all the Genesis technologies.
- ES6
- React 16.8.6
- React-Boostrap 1.0.x
- SASS
- webpack 3.3.x
- babel
- axios 0.18.x
- loadash
- jest 24.7.x . (Unit Testing)
- enzyme 1.11.x (Unit Testing)
- Redux (Should be added)
- GraphQl (Should be added)
- React Doc

### 5. Installation:

1. Go to cd/frontend
2. Install all the dependencies \$npm install
3. Run the application \$ npm start

### 6. Recommended Configurations

- The App is designed in a way that we can have one Microsite to handle different flow based on the client specifications.
- We have several Configuration that Genesis engine support.

```
    src/Config/
          Config.json // the entry point of the App
          Route.json // the flow of your routing App
          Languages.json  // have the type UI and the default languages that we want Genesis support.
          Form/
           FormName/
            form_en-US.json
            form_fr-Fr.json
          Locales/
            textTranslation.json
```

### 6.1 Flow Configuration

```
src/Config/Config.json/
  "micrositeRoute": {
    "loginWithUserCredentials": true,   // if the user want to start with the login form username, password such us "Emc"
    "loginWithUIDWritsband": false,     //if the user want start his page by the UID Wristband "not implimented yet"
    "loginWithScanWritsban": false,     // if the user want to start with Scan Wristband "not implimented yet"
    "loginWithoutCredentials": false,   // if the user try to login without any credetials "not implimented yet"
    "loginWithEmail": false             //if the user try to login with his email such us "Neflix"
  },
  "register": {                         //the function that the registration will handle
    "registerCreateOrder": false,       //user will create an order when he register
    "registerUpdateOrder": false,       //user will update an order taht have already created  such us "Netflix"
    "registerProfile": false,           //the user will create a profile based on wristband
    "createProfileWithoutWristband": false,  //if the  user want to create a profile without wristband validation.
    "updateProfile": false,              //if the user want to user already exist and he want to update his profile.
    "verifyWristbandAndRegister": true,  // if the user should verify wristband before creating a profile
    "VerifyBarcodeAndRegister": false .  // add the barcode UI for validating that before registration such us  "AFL"
  },
  "show":{
   "verifyWristband": false,            //add the activate link in the main login page
   "validationProfileWithEmail": true . //redirecting the user for validating his email, if not he will go to the home user profile.
    "HorizontalSideDrawer": false, // add the horizantal side drawer toolbar in the mobile style.
    "VerticalSideDrawer": true .  // add the veritical side drawer in the mobile style.
  }

```

### 6.2 Routing Configuration:

- To handle the routing, we need to configurate the flow .

```
src/Config/Routes.json
  {
     "path": "/",                   //the path
     "component": "login",          //component name in lowercase
     "exact": true ,
     "typeRoute": "private" // protect the route if the user in not authenticated.
   },
```

### 6.3 Form Configuration

```
src/Config/Form.json
  "email": {
    "customBootstrapClass": "col-md-12",
    "elementType": "input",
    "elementConfig": {
      "label": "Email",
      "type": "email",
      "placeholder": "Your Email"
    },
    "validation": {
      "required": true,
      "isEmail": true
    },
    "valid": false,
    "touched": false,
    "errorText": "You have entered an Invalid email",
    "value": "",
    "key": 3,
    "show": true
  },
```

### 6.4 Internationalization configuration

- Add a language under internationalization Language object.

```
 src/Config/Languages.json
    "Languages": [
      {
        "key": "en",         //key for translation files, we are using this key as a folder name
        "slug": "en",
        "name": "English",   // Full name for language switcher
        "shortname": "En",   //Short name for language switcher
        "active": true       //just set this option to false to hide a language
      },
      ...
    ]
```

### 7. Deployment

### 7. How Create branch ?

### Feedback

If there's anything you'd like to add or you see that is missing , please feel free !
