yarn.service("Transaction", function () {

    function Transaction(operation, metadata) {
        this.operation = operation;
        this.metadata = metadata;
    }

    Transaction.prototype.pojo = function () {
        return {
            operation: this.operation,
            metadata: this.metadata
        }
    };

    return Transaction;

});