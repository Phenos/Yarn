yarn.service("transactions", function (Transactions, yConsole, consoleHelper, channel) {
    var transactions = new Transactions();


    channel.subscribe("state.createAssertion", function (data) {
        transactions.add("create", {
            assertion: data.assertion.pojo()
        });
        yConsole.transaction("Created: " + consoleHelper.assertion2log(data.assertion), {
            source: data.source
        });
    });

    channel.subscribe("state.deleteAssertion", function (data) {
        transactions.add("delete", {
            assertion: data.assertion.pojo()
        });
        yConsole.transaction("Deleted: " + consoleHelper.assertion2log(data.assertion), {
            source: data.source
        });
    });

    channel.subscribe("state.updateAssertion", function (data) {
        transactions.add("create", {
            replaced: data.replaced,
            assertion: data.assertion.pojo()
        });
        yConsole.transaction("Updated: " + consoleHelper.assertion2log(data.assertion), {
            source: data.source
        });
    });

    channel.subscribe("commands.command", function (data) {
        transactions.transaction("command", {
            command: data
        });
    });

    return transactions;
});


yarn.service("Transactions", function (Transaction) {

    /*

     Operations:
     "create": Create a new assertion
     "update": Update an existing assertion
     "delete": Delete an existing assertion
     "command": Run a user command

     */
    function Transactions() {
        this.log = [];

    }

    Transactions.prototype.add = function (operation, metadata) {
        var transaction = new Transaction(operation, metadata);
        this.log.push(transaction);
        this.persist();
    };

    Transactions.prototype.undo = function (state) {
        console.log("UNDO!", state);
    };

    Transactions.prototype.persist = function () {
    };

    return Transactions;

});