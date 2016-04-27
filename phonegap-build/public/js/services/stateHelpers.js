yarn.service("stateHelpers", function (inventoryInRoomHelper,
                                       ownInventoryHelper,
                                       usableItemInRoomHelper,
                                       doorsInRoomHelper,
                                       thingsInRoomHelper) {

    return {
        usableItemInRoom: usableItemInRoomHelper,
        inventoryInRoom: inventoryInRoomHelper,
        doorsInRoom: doorsInRoomHelper,
        ownInventory: ownInventoryHelper,
        thingsInRoom: thingsInRoomHelper
    }

});