yarn.service("Stack", function () {

    function Stack() {
        this.scopes = [];
    }

    Stack.prototype.size = function () {
        return this.scopes.length;
    };

    Stack.prototype.head = function () {
        return this.scopes[this.scopes.length - 1];
    };

    Stack.prototype.parent = function () {
        var offset = (this.scopes.length > 2) ? 2 : 1;
        return this.scopes[this.scopes.length - offset];
    };

    Stack.prototype.root = function () {
        return this.scopes[0];
    };

    Stack.prototype.push = function (obj) {
        //console.log("Pushed : ", obj);
        var head = this.head();
        this.scopes.push(new Scope(obj, head));
    };

    Stack.prototype.pop = function () {
        //console.log("pop!");
        this.scopes.pop();
    };

    function Scope(obj, parent) {
        this.values = obj;
        this.parent = parent;
    }

    return Stack;
});