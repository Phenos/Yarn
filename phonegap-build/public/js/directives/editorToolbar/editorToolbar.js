yarn.directive('editorToolbar', EditorToolbarDirective);

function EditorToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        replace: true,
        transclude: true,
        controllerAs: 'toolbar',
        template:'<div style="z-index: 1000;" md-whiteframe=4><md-toolbar md-whiteframe=4 class="editorToolbar md-menu-toolbar" flex=noshrink layout=row><div flex=100 layout=row><md-toolbar-filler layout layout-align="center center"><md-icon ng-show=!toolbar.IDE.isWorking md-svg-icon=./svg-icons/storyFile.svg></md-icon><md-progress-circular ng-if=toolbar.IDE.isWorking md-diameter=30 md-mode=indeterminate></md-progress-circular></md-toolbar-filler><div flex=100><h2 class=md-toolbar-tools>{{ toolbar.state.story.id }}</h2><md-menu-bar><md-menu><button ng-click=$mdOpenMenu()>Project</button><md-menu-content><md-menu-item><md-button ui-sref=createNewProject()>Create new project</md-button></md-menu-item><md-menu-item><md-button ng-click=toolbar.openFromProject()>Browse project files <span class=md-alt-text>{{:: \'M-O\' | keyboardShortcut }}</span></md-button></md-menu-item><md-menu-item><md-button ng-click=toolbar.IDE.saveAllAndRun()>Save All and Run <span class=md-alt-text>{{:: \'M-Enter\' | keyboardShortcut }}</span></md-button></md-menu-item><md-menu-item><md-button ng-click=toolbar.IDE.saveAll()>Save All <span class=md-alt-text>{{:: \'M-S\' | keyboardShortcut }}</span></md-button></md-menu-item><md-menu-item><md-button ng-click=toolbar.run()>Run <span class=md-alt-text>{{:: \'M-S-Enter\' | keyboardShortcut }}</span></md-button></md-menu-item><md-menu-item><md-button ng-click=toolbar.validate()>Validate Current State <span class=md-alt-text>{{:: \'M-S-V\' | keyboardShortcut }}</span></md-button></md-menu-item></md-menu-content></md-menu><md-menu><button ng-click=$mdOpenMenu()>Files</button><md-menu-content><md-menu-item><md-button ng-click=toolbar.IDE.newFile($event)>Create new file <span class=md-alt-text>{{:: \'C-S-N\' | keyboardShortcut }}</span></md-button></md-menu-item></md-menu-content></md-menu><md-menu><button ng-click=$mdOpenMenu()>Options</button><md-menu-content><md-menu-item><md-button ng-click=toolbar.hideConsole()>Close Editor <span class=md-alt-text>{{:: \'M-Esc\' | keyboardShortcut }}</span></md-button></md-menu-item></md-menu-content></md-menu></md-menu-bar></div><div flex=1><md-button class="md-icon-button close-button" ng-click=toolbar.hideConsole() aria-label="Close console"><md-icon md-svg-icon=./svg-icons/close.svg></md-icon></md-button></div></div></md-toolbar><md-toolbar flex=no-shrink class=editorIconToolbar><div class=md-toolbar-tools><md-button ng-click=toolbar.IDE.newFile($event) class=md-icon-button aria-label="New file"><md-icon md-svg-icon=./svg-icons/new-file.svg></md-icon><md-tooltip>New File</md-tooltip></md-button><md-button ng-click=toolbar.editors.current.save() class=md-icon-button aria-label=Save><md-icon md-svg-icon=./svg-icons/save.svg></md-icon><md-tooltip>Save</md-tooltip></md-button><md-button ng-click=toolbar.editors.current.reload() class=md-icon-button aria-label="Reload from file"><md-icon md-svg-icon=./svg-icons/load.svg></md-icon><md-tooltip>Reload</md-tooltip></md-button><md-button ng-click=toolbar.editors.current.saveAllAndRun() class=md-icon-button aria-label="Save and run story"><md-icon md-svg-icon=./svg-icons/play-toolbar.svg></md-icon><md-tooltip>Save and run story</md-tooltip></md-button><md-button ng-click=toolbar.validate() class=md-icon-button aria-label=Validate><md-icon md-svg-icon=./svg-icons/validate.svg></md-icon><md-tooltip>Validate</md-tooltip></md-button><md-button ng-click=toolbar.editors.current.search() class=md-icon-button aria-label=Search><md-icon md-svg-icon=./svg-icons/search.svg></md-icon><md-tooltip>Search</md-tooltip></md-button><md-button ng-click=toolbar.editors.current.rename($event) class=md-icon-button aria-label=Rename><md-icon md-svg-icon=./svg-icons/rename.svg></md-icon><md-tooltip>Rename</md-tooltip></md-button><span flex></span><save-status><a target=_blank ng-href="{{ toolbar.editors.current.file.__absoluteURI }}" ng-bind=toolbar.editors.current.file.status></a><md-tooltip md-direction=left md-delay=250>File located at {{ toolbar.editors.current.file.__absoluteURI }}</md-tooltip></save-status><md-button ng-click=toolbar.editors.current.close() class=md-icon-button aria-label=Close><md-icon md-svg-icon=./svg-icons/close.svg></md-icon><md-tooltip>Close</md-tooltip></md-button></div></md-toolbar></div>',
        controller: EditorToolbarController
    };

    function EditorToolbarController(editors,
                                     state,
                                     root,
                                     tools,
                                     IDE) {
        this.IDE = IDE;
        this.state = state;
        this.editors = editors;

        this.validate = function() {
            tools.focus("validator");
            this.IDE.validate();
        };

        this.openFromProject = function () {
            tools.focus("project");
        };

        this.run = function() {
            tools.focus("commands");
            this.IDE.run();
        };

        this.search = function() {
            editors.search();
        };

        this.hideConsole = function () {
            root.hideConsole();
        };

        this.openHelp = function() {
            root.showHelp();
        };
    }
}
