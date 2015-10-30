# BACKLOG

## Upcomming

- More powerfull method from complexe queries

```
    Ball is a Inventory Item
    var isInventoryItems = thing("InventoryItem").getReverse("isA");
    var thingsInRoom =
        thing("You")
            .get("isIn") // Get the room your in
                .get("hasInIt") // Get the things that are in the room
                    .filter(isInventoryItems) // Keep only items that are also inventory items
```

## BUG

- Bug: Number are interpreted as string
- Very first char is lost during parsing of tokens
- An error is always triggered at start:
    - Unknown node variant [undefined]
    - Impossible to create assertion without at least a subject and a predicate.


## Unplanned features

- 

## WBS

### Topic: Refactoring & Optimizations

- Build and Publish mechanics for staging and production
- Make tokenizer more modular with types of "in/out" state handlers
- Combine JS and CSS resources with SourceMaps
- Bring back web fonts locally

### Topic: Loading and stage persistence mechanics

- Load scripts trough script tag
- Ability to set Stories and Chapter scope
- Reader can switch between le list of available stories
- State is flushed when loading another story
- Persist state in real-time at "Story" level
- Retrieve stored state when comming back to a story
- Command to clear the state

### Topic: State Machine and Game Engine

- Use "@" for reserved constants or native objects
- Find a way to dynamize long texts with variables and references
- Handle "unique value" assertions such as "isIn"
- Handle negative assertions syntax such as "is not in"
- parser: support for blocks like "start chapter / end chapter"
- Have a separate set of state/assertions between the original state and the changed state
- Ability to reset the game back to the original state without reloading the scripts

### Topic: UI

- Pause log between long log items, spacebar to continue
- Command to "clear log" and restate me where I am - C
- Command to exit the context backward to the room - X
- Syntax and mechanic for hightlighting words in the text and link them with game assets

### Epic: Basic Game Mechanics

- Reader ends the story
- Reader is show thans and credits when the story ends
- Reader ends a chapter and starts another
- Reader restarts the whole story
- Reader dies and must restart a chapter
- Reader is stuck and chooses to restart chapter
- Reader views a cover page (with a story summary) for the story before beginning
- Reader can lookback at the cover page while playing
- Reader can look at the credits while playing

### Epic: Goals & Achievement

- Writer set goals for the reader
- Writer ads new goals mid-story
- Reader has goals wich are completed or not according to the game state
- Reader is notified when a goal is added, achieved, is failed or is undone.
- Events can occurs when some goals are reached

### Epic : Hints and assistance

- Writer write game hints which are available depending on the game
- Reader checks if a hint is available for the current contact

### Topic: Debugging and Error handling

- Ability to run pre-scripted scenarios as tests (unit testing in the same syntax? With assertions?)
- Errors during should output a trace. Ex.: "Unknown node variant"
- Warn of unknown predicate
- Debug mode to show when/how state changes trough the story
- Rename the "UserInput" into "Console"
- Activate the debug mode with a keystroke
- Show or hide the console according to the debug mode status
- Ability to "rewing" and "fast-forward" the state trought a transaction log on the state machine

### Epic: Actors and Dialogs

- Ability to have other actors in the game
- Talk button lists available actors
- Reader has conversation with another actor
- Ability to switch from one actor to another

### Epic: Events

- Basic event handler
- Trigger storyLog entries upon event
- Trigger when moving in/out/beteen rooms
- Trigger when taking or placing objects
- Trigger when looking at something
- Conditionnal events
- Counters (ex.: ability to count how many time reader entered the room)

### Epic: Usage

- Reader uses an object in the room
- Reader uses an object in his inventory
- Reader uses an inventory object with something in the room
- Reader uses an inventory object with something in the room
- Reader uses an inventory object with another inventory object

### Epic: Inventory

- Prompt to "choose" an inventory item (ex.: discard, place, use, look)
- Prompt to "do things" with the selected inventory item (ex.: discard, place, use, look)
- Support for inventory items that are finite supply.
- Support for inventory items that are infinite supply.
- Support for inventory items that are unique (taking the item, takes it away from current position)
- Ability to place back in somthing that is a "container".
- Restrict in which type of container an item can go. (ex.: Moving stuff from a drawer to the fridge)
- Restrict in which exact container an item gan go.
- Player can "discard" an item if the item is discardable. 

### Epic: Prompt!

- Trigger choices with keystrokes specific to each prompt/options
- Exit a "is about to" type of prompt with a "X" button
- Exit a "is about to" type of prompt with the Esc key

### Epic: Movement

- Trigger a move command with the "m" key
- With the move command, show a log item of type "options" to show the list of rooms
- Focus the cursor on the first option
- Select a room from the list using the keyboard (arrows or tab and spacebar)
- Move the player from one room to another when a selection is made
- Trigger the "entered room" routine when entering a room
- Ensure that a player is not in two room at once

### Epic: Room Movement Deluxe

- Movements are described with a "action" type log
- Room descriptio are described with "described" type log
- Trigger a selection of room with the number keys [1 to 9]
- Press [esc] to cancel the current choice
- Select a room with the mouse
- Remove the list of choice after a selection is made
- When entering a room, dont show the same room description more than X times in Y minutes
- When no rooms are available, the "No rooms available" message fades out after a moment