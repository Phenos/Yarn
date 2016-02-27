yarn.service("stateHelpers", function (inventoryInRoomHelper,
                                       thingsInRoomHelper) {

    return {
        inventoryInRoom: inventoryInRoomHelper,
        thingsInRoom: thingsInRoomHelper
    }

});