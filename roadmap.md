
# NEXT

- More powerfull method from complexe queries

Ball is a Inventory Item
var isInventoryItems = thing("InventoryItem").getReverse("isA");
var thingsInRoom =
    thing("You")
        .get("isIn") // Get the room your in
            .get("hasInIt") // Get the things that are in the room
                .filter(isInventoryItems) // Keep only items that are also inventory items

# BUG

- Bug: Number are interpreted as string
- Very first char is lost during parsing of tokens
- An error is always triggered at start:
    Unknown node variant [undefined]
    Impossible to create assertion without at least a subject and a predicate.

# Refactoring

- Make tokenizer more modular with types of "in/out" state handlers

# EPICS

- Dialogs and Actors
- Hints and assistance
- 

# BACKLOG

- Combine JS and CSS resources with SourceMaps
- Bring back web fonts locally

- List available rooms with numbered options

- Command to "clear log" and show me where I am - C
- Command to "use" - U - Show objects you can use right now (inventory and in context)
- Command to "take" - T
- Command for "objects" - O - Show objects you can use/take/put-back right now (inventory and in context)
- Command to "talk to/say" - S
- Command for "hint" - H
- Command to exit the context backward to the room - X

- Pause log between long log items, spacebar to continue
- Have a separate set of state/assertions between the original state and the changed state
- Syntax and mechanic for hightlighting words in the text and link them with game assets
- Handle "unique value" assertions such as "isIn"
- Handle negative assertions syntax such as "is not in"
- Put all state rendering into a "debug" panel in the game ui
- parser: support for blocks like "start chapter / end chapter"
- Use "@" for reserved constants or native objects
- Find a way to dynamize long texts with variables and references
- Ability to switch from one actor to another
- 


# WBS

## Debugging and Error handling

- Errors during should output a trace. Ex.: "Unknown node variant"
- Warn of unknown predicate
- Debug mode to show when/how state changes trough the story

## Epic: Events

- Basic event handler
- Trigger storyLog entries upon event
- Trigger when moving in/out/beteen rooms
- Trigger when taking or placing objects
- Trigger when looking at something
- Conditionnal events
- Counters (ex.: ability to count how many time reader entered the room)

## Epic: Inventory

- Prompt to "choose" an inventory item (ex.: discard, place, use, look)
- Prompt to "do things" with the selected inventory item (ex.: discard, place, use, look)
- Support for inventory items that are finite supply.
- Support for inventory items that are infinite supply.
- Support for inventory items that are unique (taking the item, takes it away from current position)
- Ability to place back in somthing that is a "container".
- Restrict in which type of container an item can go. (ex.: Moving stuff from a drawer to the fridge)
- Restrict in which exact container an item gan go.
- Player can "discard" an item if the item is discardable. 

## Epic: Prompt!

- Trigger choices with keystrokes specific to each prompt/options

## Epic: Loading and stage persistence mechanics

- Load scripts trough <script> tag
- Ability to set Stories and Chapter scope
- Reader can switch between le list of available stories
- State is flushed when loading another story
- Persist state in real-time at "Story" level
- Retrieve stored state when comming back to a story
- Command to clear the state

## Epic: Player moves from one room to another

- Trigger a move command with the "m" key
- With the move command, show a log item of type "options" to show the list of rooms
- Focus the cursor on the first option
- Select a room from the list using the keyboard (arrows or tab and spacebar)
- Move the player from one room to another when a selection is made
- Trigger the "entered room" routine when entering a room
- Ensure that a player is not in two room at once

## Room movement refinements

- Movements are described with a "action" type log
- Room descriptio are described with "described" type log
- Trigger a selection of room with the number keys [1 to 9]
- Press [esc] to cancel the current choice
- Select a room with the mouse
- Remove the list of choice after a selection is made
- When entering a room, dont show the same room description more than X times in Y minutes
- When no rooms are available, the "No rooms available" message fades out after a moment