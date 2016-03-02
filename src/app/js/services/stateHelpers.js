yarn.service("stateHelpers", function (inventoryInRoomHelper,
                                       usableItemInRoomHelper,
                                       thingsInRoomHelper) {

    return {
        usableItemInRoom: usableItemInRoomHelper,
        inventoryInRoom: inventoryInRoomHelper,
        thingsInRoom: thingsInRoomHelper
    }

});