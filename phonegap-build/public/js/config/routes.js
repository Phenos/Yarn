yarn.service("firebaseConnection", function (Firebase) {
    return new Firebase("https://yarnstudiodev.firebaseio.com");
});

yarn.service("apiClient", function ($window) {
    var apiClient = null;
    if ($window.ActionheroClient) {
        apiClient = new ActionheroClient();
    }
    // console.log("apiClient", [apiClient]);
    return apiClient;
});

yarn.service("auth", function (firebaseConnection, $firebaseAuth) {
    return $firebaseAuth(firebaseConnection)
});

yarn.service("authUser", function (auth, authData2user) {
    console.info("Authenticating user");
    return auth.$waitForAuth().then(function () {
        var user = null;
        var authData = auth.$getAuth();
        if (authData) {
            user = authData2user(authData);
            console.info("Found authenticated user", authData);
        } else {
            console.info("No authenticated user");
        }
//        console.log("user", user);
//        console.log("auth", auth);
//        console.log("authUser authData", authData);
        return user;
    });

});

yarn.service("authData2user", function authData2user() {
    return function (authData) {
        var profile = authData[authData.provider];
        return {
            username:
                authData.provider + "." +
                authData[authData.provider].username,
            profileImageURL: profile.profileImageURL,
            displayName: profile.displayName,
            token: authData.token,
            rawAuthData: authData
        };
    }

});

yarn.service("login", function (auth) {
    return function login() {
        return auth.$authWithOAuthRedirect("twitter").then(function (authData) {
            console.info("Logged in as:", authData.uid);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
    };
});

yarn.config(function ($locationProvider,
                      $stateProvider,
                      $urlRouterProvider) {

//    $locationProvider.html5Mode(true);
//    $locationProvider.hashPrefix('!');

    function resolveUser(authUser, session) {
        return authUser.then(function (user) {
            if (user) {
                session.open(user);
            }
            return user;
        });
    }

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
        url: '',
        resolve: {
            "user": resolveUser
        },
        controllerAs: 'root',
        bindToController: {},
        template:'<md-content style="z-index:5; overflow: hidden;" flex=grow layout=row><early-bird ng-if=false><img src=/images/early-bird.png class=hvr-buzz-out ng-click=open()><div class=message ng-click=open()><span>Get early access with the <strong class=underline>Early Bird</strong> special.</span></div></early-bird><player class=layout-panel flex=auto user=user layout=column></player><md-section md-whiteframe=10 class=IDE layout=column flex=grow ng-if=_IDEisVisible hide-xs><md-section layout=row flex style="overflow: hidden; position: relative;"><md-section ng-if=state.story.exists md-whiteframe=10 class=layout-panel flex=100 style="z-index: 10;" layout=column><editor-toolbar></editor-toolbar><div flex=grow layout=column><div class=bottomShadow></div><editor-tabs ng-show="editorFiles.files.length > 0" layout=column></editor-tabs><div style="background: #fff;" ng-show="editorFiles.files.length === 0" layout=column layout-align="center center" flex=100><div flex=20></div><div layout=column><div style="color: #666; text-align: center;">No files are curently open!</div><br><md-button ng-click=openMain() class=md-primary>Open the main story.txt file</md-button><md-button ng-click=openProjectTool() class=md-primary>Browse Project files</md-button></div><div flex=60></div></div></div></md-section><div style="background: #fff;" ng-if=!state.story.exists layout=column layout-align="center center" flex=100><div flex=30></div><div layout=column><div style="color: #666; text-align: center;">You must first choose an existing project before using the story editor</div></div><div flex=60></div></div></md-section><md-section md-whiteframe=10 layout=column class="toolTabs layout-panel" flex="{{ consoleFlexHeight }}" flex-order=5><div class=toolTabs-toggle><md-button class=md-icon-button ng-click=toggleTools() aria-label="Show&Hide tools"><md-icon ng-show=!toolsAreVisible md-svg-icon=./svg-icons/pull-up.svg></md-icon><md-icon ng-show=toolsAreVisible md-svg-icon=./svg-icons/pull-down.svg></md-icon></md-button></div><tools></tools></md-section></md-section><md-section ng-if=_helpIsVisible md-whiteframe=10 flex=100 layout=column class=layout-panel><help-toolbar></help-toolbar><div style="overflow: hidden;" flex=100 layout=row><help on-escape-focus=onHelpEscapeFocus() on-focus=onHelpFocus()></help></div></md-section></md-content>',
        controller: 'root'
    });
    $stateProvider.state('createNewProject', {
        url: '/createNewProject/:story',
        resolve: {
            "user": resolveUser
        },
        template:'<md-content style="z-index:5; overflow: hidden;" flex=grow layout=row><div style="position: relative" layout=column layout-fill><wallpaper></wallpaper><sidebar></sidebar><toolbar user=player.user></toolbar><md-content layout-fill class=player layout=column layout-align="start center" ng-if=!player.state.readyness.isReady><div class=createNewProject><form name=createForm layout=column><div ng-if=!isSuccess class=heading><md-icon md-svg-icon=./svg-icons/story.svg></md-icon><h2>Create a new project</h2></div><div ng-if=isSuccess class=heading><md-icon md-svg-icon=./svg-icons/success.svg></md-icon><h2>Thank you for joining!</h2></div><div layout=column ng-if=!profiles.authenticated() layout-align="center center"><p>Before creating a new story project, you must login with your twitter account.</p><md-list><md-list-item><md-button ng-click=login()>Login</md-button></md-list-item></md-list></div><div layout=column ng-if=error layout-align="center center"><p>A problem occured while trying to create the project. The problem has been sent to the Yarn team.</p><p>You can try again or contact us if the problem persits.</p><md-list><md-list-item><md-button ng-click=tryAgain()>Try Again</md-button></md-list-item><md-list-item><md-button href=http://yarnstudio.io/contact>Contact Us</md-button></md-list-item><md-list-item><md-button href=https://twitter.com/YarnStudioGames>Tweet Us!</md-button></md-list-item></md-list></div><div flex layout=column ng-if="isLoading && profiles.authenticated()" layout-align="center center"><md-progress-circular flex md-diameter=70 md-mode=indeterminate></md-progress-circular></div><div layout=column ng-if=isSuccess layout-align="center center"><p>Your new project has been created!</p><md-list><md-list-item><md-button ui-sref="story({ profile: profile.shortUsername, story: projectName })">Open the editor</md-button></md-list-item></md-list></div><div flex layout=column ng-if="isLoading && profiles.authenticated()" layout-align="center center"><md-progress-circular flex md-diameter=70 md-mode=indeterminate></md-progress-circular></div><div ng-show="!error && !isSuccess && !isLoading && profiles.authenticated()"><div><p>Do you want to create your own interative story with Yarn ?</p><p><strong>Important:</strong> Yarn\'s free platform is aimed at creating an open and shared experience for everyone involved (authors and players). This is why we require that the works be published under a well known Creative Commons license.</p><p>The first step to start writing a new story is to choose a folder name for your project. Only use letters, numbers or the dash symbol :</p></div><fieldset><md-input-container class=md-block flex-gt-xs><label>Project Folder Name</label> <input required type=text name=folderName md-maxlength=30 maxlength=30 ng-pattern="\'[1-9a-zA-Z-]*\'" ng-model=projectName><div ng-messages=createForm.folderName.$error class=md-input-messages><div ng-message=required>The folder name is required.</div><div ng-message=maxlength>The folder name has to be less than 30 characters long.</div><div ng-message=pattern>The folder name can only contain numbers, letters or the dash symbol.</div></div></md-input-container><md-checkbox style="float: left" required name=acceptLicense aria-label="I accept the license" ng-model=acceptLicense></md-checkbox><p>This work is licensed under a <a target=blank rel=license href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.</p></fieldset><div><p>Your new project will be created with a sample story already inside. Once created, you will be redirected to the story editor.</p></div><div><div ng-messages=createForm.acceptLicense.$error class=md-input-messages><p ng-message=required class=must-accept-reminder>* You must accept the license.</p></div><md-list><md-list-item><md-button ng-disabled=createForm.$invalid ng-click=confirm(this)>Create New Project</md-button></md-list-item></md-list></div></div></form></div></md-content></div></md-content>',
        controller: 'createNewProject'
    });
    $stateProvider.state('profile', {
        url: '/:profile',
        resolve: {
            "user": resolveUser
        },
        controllerAs: 'root',
        bindToController: {},
        template:'<md-content style="z-index:5; overflow: hidden;" flex=grow layout=row><early-bird ng-if=false><img src=/images/early-bird.png class=hvr-buzz-out ng-click=open()><div class=message ng-click=open()><span>Get early access with the <strong class=underline>Early Bird</strong> special.</span></div></early-bird><player class=layout-panel flex=auto user=user layout=column></player><md-section md-whiteframe=10 class=IDE layout=column flex=grow ng-if=_IDEisVisible hide-xs><md-section layout=row flex style="overflow: hidden; position: relative;"><md-section ng-if=state.story.exists md-whiteframe=10 class=layout-panel flex=100 style="z-index: 10;" layout=column><editor-toolbar></editor-toolbar><div flex=grow layout=column><div class=bottomShadow></div><editor-tabs ng-show="editorFiles.files.length > 0" layout=column></editor-tabs><div style="background: #fff;" ng-show="editorFiles.files.length === 0" layout=column layout-align="center center" flex=100><div flex=20></div><div layout=column><div style="color: #666; text-align: center;">No files are curently open!</div><br><md-button ng-click=openMain() class=md-primary>Open the main story.txt file</md-button><md-button ng-click=openProjectTool() class=md-primary>Browse Project files</md-button></div><div flex=60></div></div></div></md-section><div style="background: #fff;" ng-if=!state.story.exists layout=column layout-align="center center" flex=100><div flex=30></div><div layout=column><div style="color: #666; text-align: center;">You must first choose an existing project before using the story editor</div></div><div flex=60></div></div></md-section><md-section md-whiteframe=10 layout=column class="toolTabs layout-panel" flex="{{ consoleFlexHeight }}" flex-order=5><div class=toolTabs-toggle><md-button class=md-icon-button ng-click=toggleTools() aria-label="Show&Hide tools"><md-icon ng-show=!toolsAreVisible md-svg-icon=./svg-icons/pull-up.svg></md-icon><md-icon ng-show=toolsAreVisible md-svg-icon=./svg-icons/pull-down.svg></md-icon></md-button></div><tools></tools></md-section></md-section><md-section ng-if=_helpIsVisible md-whiteframe=10 flex=100 layout=column class=layout-panel><help-toolbar></help-toolbar><div style="overflow: hidden;" flex=100 layout=row><help on-escape-focus=onHelpEscapeFocus() on-focus=onHelpFocus()></help></div></md-section></md-content>',
        controller: 'root'
    });
    $stateProvider.state('story', {
        url: '/:profile/:story',
        resolve: {
            "user": resolveUser
        },
        controllerAs: 'root',
        bindToController: {},
        template:'<md-content style="z-index:5; overflow: hidden;" flex=grow layout=row><early-bird ng-if=false><img src=/images/early-bird.png class=hvr-buzz-out ng-click=open()><div class=message ng-click=open()><span>Get early access with the <strong class=underline>Early Bird</strong> special.</span></div></early-bird><player class=layout-panel flex=auto user=user layout=column></player><md-section md-whiteframe=10 class=IDE layout=column flex=grow ng-if=_IDEisVisible hide-xs><md-section layout=row flex style="overflow: hidden; position: relative;"><md-section ng-if=state.story.exists md-whiteframe=10 class=layout-panel flex=100 style="z-index: 10;" layout=column><editor-toolbar></editor-toolbar><div flex=grow layout=column><div class=bottomShadow></div><editor-tabs ng-show="editorFiles.files.length > 0" layout=column></editor-tabs><div style="background: #fff;" ng-show="editorFiles.files.length === 0" layout=column layout-align="center center" flex=100><div flex=20></div><div layout=column><div style="color: #666; text-align: center;">No files are curently open!</div><br><md-button ng-click=openMain() class=md-primary>Open the main story.txt file</md-button><md-button ng-click=openProjectTool() class=md-primary>Browse Project files</md-button></div><div flex=60></div></div></div></md-section><div style="background: #fff;" ng-if=!state.story.exists layout=column layout-align="center center" flex=100><div flex=30></div><div layout=column><div style="color: #666; text-align: center;">You must first choose an existing project before using the story editor</div></div><div flex=60></div></div></md-section><md-section md-whiteframe=10 layout=column class="toolTabs layout-panel" flex="{{ consoleFlexHeight }}" flex-order=5><div class=toolTabs-toggle><md-button class=md-icon-button ng-click=toggleTools() aria-label="Show&Hide tools"><md-icon ng-show=!toolsAreVisible md-svg-icon=./svg-icons/pull-up.svg></md-icon><md-icon ng-show=toolsAreVisible md-svg-icon=./svg-icons/pull-down.svg></md-icon></md-button></div><tools></tools></md-section></md-section><md-section ng-if=_helpIsVisible md-whiteframe=10 flex=100 layout=column class=layout-panel><help-toolbar></help-toolbar><div style="overflow: hidden;" flex=100 layout=row><help on-escape-focus=onHelpEscapeFocus() on-focus=onHelpFocus()></help></div></md-section></md-content>',
        controller: 'root'
    });

});
