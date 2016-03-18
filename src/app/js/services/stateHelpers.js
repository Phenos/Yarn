yarn.service("stateHelpers", function (inventoryInRoomHelper,
                                       ownInventoryHelper,
                                       usableItemInRoomHelper,
                                       exitsInRoomHelper,
                                       thingsInRoomHelper) {

    return {
        usableItemInRoom: usableItemInRoomHelper,
        inventoryInRoom: inventoryInRoomHelper,
        exitsInRoom: exitsInRoomHelper,
        ownInventory: ownInventoryHelper,
        thingsInRoom: thingsInRoomHelper
    }

});