# Large Code Base

## Background

This is a 2000 LoC sample project with some real functionality.
Possible breakdown of the lines could be

* Basic Structure: A typical class with a few methods might take around 50-100 lines of code.
* CRUD Operations: Implementing basic CRUD operations for a few entities could take around 200-400 lines of code.
* Business Logic: Depending on the complexity, business logic can vary widely, but let's estimate around 300-600 lines for moderate complexity.
* Utility Methods: General utility methods might take up around 100-200 lines.
* Error Handling: Basic error handling and logging could add another 100-200 lines.

Scope

* Several classes (let's say around 10-20)
* Basic CRUD operations for a few entities
* Moderate business logic
* Utility methods
* Basic error handling

## Domain

**Dragon Breeding & Training Academy**

* Entities: Dragons, Trainers, Breeds, Skills, Training Sessions, Quests
* Business logic: Dragon evolution, skill progression, breeding genetics, quest assignments, elemental affinities
* Rich state management with fantasy progression systems

## Use Cases

Sorted by complexity (simplest to most complex):

### Low Complexity

1. **View Dragon Details**
   * Retrieve and display a dragon's attributes, breed, level, and stats
   * Simple read operation with basic data formatting

2. **List All Trainers**
   * Get all trainers with pagination and basic filtering
   * Straightforward CRUD read with query parameters

3. **Register New Trainer**
   * Create a new trainer account with basic validation
   * Simple entity creation with field validation

4. **Assign Dragon to Trainer**
   * Link an existing dragon to a trainer
   * Basic relationship management

### Medium Complexity

5. **Create New Dragon**
   * Generate a dragon with breed-specific base stats and elemental affinity
   * Requires breed lookup and stat calculation logic

6. **Complete Training Session**
   * Record a training session and update dragon's skill experience
   * State updates with validation and experience calculations

7. **Learn New Skill**
   * Add a skill to a dragon if level requirements are met
   * Conditional logic with prerequisite checking

8. **View Available Quests**
   * List quests filtered by dragon level and elemental requirements
   * Complex filtering with multiple criteria

9. **Start Quest**
   * Assign dragon to quest, validate requirements, set status
   * Multi-entity validation and state management

### High Complexity

10. **Complete Quest**
    * Calculate rewards based on performance, update dragon stats, distribute loot
    * Complex calculations with multiple outcome paths

11. **Dragon Evolution**
    * Evolve dragon to next stage when level threshold reached, recalculate all stats
    * Cascading updates with breed-specific transformation rules

12. **Breed Two Dragons**
    * Combine genetics from parent dragons to create offspring with inherited traits
    * Complex algorithm with randomization, trait inheritance, and validation

13. **Skill Progression System**
    * Track skill usage, calculate proficiency gains, unlock advanced abilities
    * Multi-layered progression with dependencies and unlocks

14. **Tournament Matchmaking**
    * Match dragons for battles based on level, skills, and elemental advantages
    * Complex algorithm with multiple weighted factors and balancing

15. **Dragon Battle Simulation**
    * Simulate turn-based combat using stats, skills, and elemental interactions
    * Most complex: turn resolution, damage calculation, status effects, AI decisions

## Rules

* Typescript
* a backend with Node.JS libraries
* plain code, compact code
* no comments

### Architecture

* Service/Layered architecture
* Assume REST API and Persistence, but not implemented.
* Persistence is mocked in tests, maybe with in memory structures.
* public API for tests in service classes.

## Code Style & Formatting Rules

### General Formatting

* **Indentation**: 4 spaces (no tabs)
* **Line endings**: Empty line at end of file
* **Quotes**: Single quotes for strings
* **Semicolons**: No semicolons (omitted)
* **Line length**: Keep reasonable, no strict limit

### TypeScript Specifics

**Enums**

* String enums with explicit values
* Each value on separate line with trailing comma
* Format: `PropertyName = 'PropertyName'`

**Interfaces**

* Properties on separate lines
* No trailing commas in property lists
* Optional properties marked with `?`
* No semicolons after properties

**Classes**

* Constructor parameters with access modifiers on separate lines
* Empty space in constructor body: `{ }` (space between braces)
* Method signatures: no space before parentheses
* Return types: explicit type annotations

**Methods**

* One blank line between methods
* Arrow functions for inline callbacks
* Ternary operators on single line when short
* Multi-line object literals with properties aligned

**Imports**

* Named imports in curly braces
* Relative paths with `../` notation
* Group related imports together
* Blank line after imports

### Naming Conventions

* **Classes**: PascalCase with descriptive suffixes (e.g., `DragonModel`, `StatsCalculator`)
* **Interfaces**: PascalCase, no prefix (e.g., `Stats`, `Dragon`)
* **Enums**: PascalCase (e.g., `Element`, `EvolutionStage`)
* **Methods**: camelCase, descriptive verbs (e.g., `addSkill`, `calculateTotalPower`)
* **Variables**: camelCase
* **Constants**: camelCase (not UPPER_CASE)
* **Static methods**: camelCase

### Test Formatting

* **Indentation**: 4 spaces for nested blocks
* **describe blocks**: Nested with 4-space indentation
* **it blocks**: Descriptive strings starting with "should"
* **Assertions**: One per line when multiple
* **Test data**: Defined at top of describe block
* **Blank lines**: Between describe blocks and between test cases

### Object Literals

* Opening brace on same line
* Properties on separate lines
* Closing brace aligned with opening statement
* No trailing comma on last property (in interfaces)
* Trailing comma allowed in object literals

### Control Flow

* **if statements**: Space after `if`, condition in parentheses
* **return statements**: Early returns preferred
* **Logical operators**: `&&` and `||` for boolean logic
* **Nullish coalescing**: Use `??` for default values

### Type Annotations

* Explicit return types on all methods
* Parameter types always specified
* Generic types with descriptive names (e.g., `<T>`)
* Array types: `Type[]` notation preferred over `Array<Type>`

### Code Organization

* One class per file
* File name matches class name
* Index files for re-exports
* Utilities in separate `utils/` directory
* Models in separate `models/` directory
* Types in separate `types/` directory
