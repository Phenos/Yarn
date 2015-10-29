
# NEXT

- More powerfull method from complexe queries

# BUG

- Bug: Number are interpreted as string
- Very first char is lost during parsing of tokens
- An error is always triggered at start:
    Unknown node variant [undefined]
    5bigmess.state.js:127 Impossible to create assertion without at least a subject and a predicate.

# Refactoring

- Move commands into a separate directive
- Move hotkey into a separate directive
- Move PromptLoop into a separate directive

# BACKLOG

- Errors during should output a trace. Ex.: "Unknown node variant"
- List available rooms with numbered options

- Command to "look" - L
- Command to "move/go" - M/G
- Command to "inventory" - I
- Command to "clear log" and show me where I am - C
- Command to "use" - U - Show objects you can use right now (inventory and in context)
- Command to "take" - T
- Command for "objects" - O - Show objects you can use/take/put-back right now (inventory and in context)
- Command to "talk to/say" - S
- Command for "hint" - H
- Command to exit the context backward to the room - X

- Pause log between long log items, spacebar to continue
- Show "keystroke" help when idle for X secondes

- Do selections and object manipulations in overlay which doesnt polute the log, only show result in log.
- Define text to appear when transitionning between rooms
- Have a separate set of state/assertions between the original state and the changed state
- Syntax and mechanic for hightlighting words in the text and link them with game assets
- Todo: reate helper for getting a predicate value or it' id as a fallback
- Handle "unique value" assertions such as "isIn"
- Handle negative assertions syntax such as "is not in"
- Ability to output various state rendering into the story log
- Put all state rendering into a "debug" panel in the game ui
- parser: support for blocks like "start chapter / end chapter"
- Address Entities with "@"
- Make predicate matching case insensitive
- Automagically create simple camelCase version of quoted entities
- Make tokenizer more modular with types of "in/out" state handlers
- Warn of unknown predicate
- Find a way to dynamize long texts with variables and references
- Ability to switch from one actor to another
- Force sequence of actions and naration
- 


# WBS

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
- 

## Epic: Prompt!

- [DONE] Prompt loop with configurable handlers
- Prompt for movement: list of available rooms
- Prompt to choose action: Move, Inventory, Look, Back

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