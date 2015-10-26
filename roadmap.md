
# NEXT

- Execution of script with state
- Bug: Number are interpreted as string

# BACKLOG

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
- Load scripts from external files
- parser: support for blocks like "start chapter / end chapter"
- Address Entities with "@"
- Make predicate matching case insensitive
- Automagically create simple camelCase version of quoted entities
- Make tokenizer more modular with types of "in/out" state handlers
- Warn of unknown predicate
- Find a way to dynamize long texts with variables and references


