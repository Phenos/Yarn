yarn.service("stateHelpers", function (inventoryInRoomHelper,
                                       ownInventoryHelper,
                                       usableItemInRoomHelper,
                                       thingsInRoomHelper) {

    return {
        usableItemInRoom: usableItemInRoomHelper,
        inventoryInRoom: inventoryInRoomHelper,
        ownInventory: ownInventoryHelper,
        thingsInRoom: thingsInRoomHelper
    }

});