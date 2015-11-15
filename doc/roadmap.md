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

## BUGS

- Bug: Number are interpreted as string
- Very first char is lost during parsing of tokens
- An error is always triggered at start:
    - Unknown node variant [undefined]
    - Impossible to create assertion without at least a subject and a predicate.


## LEFTOVER BACKLOG

- Traduire en francais


