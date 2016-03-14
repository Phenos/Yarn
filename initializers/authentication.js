module.exports = {
    loadPriority:  1000,
    startPriority: 1000,
    stopPriority:  1000,
    initialize: function(api, next){
        api.log("Initialized authentication middleware.");
        api.actions.addMiddleware({
            name: 'authentication',
            global: false,
            priority: 1000,
            preProcessor: function(data, next){
                if(!data.params.userId){
                    next(new Error('All actions require a userId') );
                }else{
                    next();
                }
            }
        });

        next();
    },
    start: function(api, next){
        next();
    },
    stop: function(api, next){
        next();
    }
}


