(function () {

    yarn.directive('editorTabs', EditorTabsDirective);
    yarn.factory('editorTabs', editorTabsService);

    function EditorTabsDirective() {
        return {
            restrict: 'E',
            bindToController: {
            },
            scope: {},
            controllerAs: 'tabs',
            template:'<md-tabs md-selected=tabs.selected flex=100 md-border-bottom md-autoselect=false><md-tab ng-repeat="file in tabs.files" md-on-select=tabs.focus(file) md-active=file.isFocused><md-tab-label>{{ file._filename }} <span ng-if=file._isModified>*</span><md-icon style="width: 1.5em; margin-left: 0.7em" ng-if=file.isMain md-svg-icon=/svg-icons/main-file.svg></md-icon></md-tab-label><md-tab-body><editor read-only="!file.ready || !file.hasOwnership" save-and-run=IDE.saveAllAndRun() source=file.content file=file layout=column ng-if=!file.errorCode flex></editor><div style="background: #fff;" ng-if=file.errorCode layout=column layout-align="center center" flex=100><div flex=20></div><div layout=column ng-if="file.errorCode === 404"><div style="color: #666; text-align: center;">This file does not exists already.</div><br><md-button ng-click=tabs.createFile(file) class=md-primary>Create it</md-button><md-button ng-click=tabs.closeFile(file) class=md-primary>Close</md-button></div><div layout=column ng-if="file.errorCode !== 404"><div style="color: #666; text-align: center;">Oups! An error occured while loading this file...</div><br><md-button ng-click=tabs.closeFile(file) class=md-primary>Close</md-button></div><div flex=60></div></div></md-tab-body></md-tab></md-tabs>',
            controller: editorTabsController
        };

        function editorTabsController(state,
                                      editors,
                                      editorTabs,
                                      editorFiles) {
            var self = this;

            self.selected = 0;

            this.focus = function (file) {
                editors.focus(file.uri.toString());
//                console.log("====================================");
//                console.log("file > ", file);
                state.persistEditorFiles(file);
            };

            this.createFile = function (file) {
                editorFiles.save(file);
            };

            this.closeFile = function (file) {
                editorFiles.close(file);
            };

            this.files = editorFiles.files;

            editorTabs.register(this);

        }
    }

    function editorTabsService() {
        var controller;

        function register(ctrl) {
            controller = ctrl;
        }

        return {
            register: register
        }
    }
})();
