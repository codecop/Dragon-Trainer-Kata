# Development Rules

## Technology & General Rules

* TypeScript
* A backend using Node.js libraries
* Plain, compact code
* No comments

## Architecture

* Service/layered architecture
* Assume a REST API and persistence layer, but they are not implemented.
* Persistence is mocked in tests, possibly with in-memory structures.
* Public API for tests is provided by service classes.

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

### ESLint configuration

ESLint is configured with strict rules to keep the codebase consistent and safe:

* Explicit return types are required.
* No explicit `any` types.
* No unused variables.
* Floating promises must be handled.
* Prefer nullish coalescing and optional chaining where appropriate.
* Curly braces are required for all control structures.
* Strict equality checks (`===`) must be used.

These rules help ensure each change is fully validated before moving to the next step, maintaining code quality and catching issues early.
