# Possible Human Exercises

## Potential Coding Exercises for Dragon Trainer Codebase

| # | Exercise Title | Area of Skill | Difficulty | Description |
|---|---------------|---------------|------------|-------------|
| 1 | **Add Dragon Name Validation** | Input Validation, Error Handling | + Easy | Add validation to `DragonService.createDragon()` to reject empty names, names with special characters, and enforce a minimum/maximum length. Update tests to verify all edge cases. |
| 2 | **Implement Dragon Filtering** | Data Filtering, Query Logic | + Easy | Add a `listDragons(filters)` method to `DragonService` that filters by level range, element, and evolution stage. Write comprehensive tests for various filter combinations. |
| 3 | **Add Skill Cooldown System** | State Management, Time Logic | ++ Medium | Extend `TrainingSession` to include a cooldown period. Modify `TrainingService.completeTrainingSession()` to prevent training the same skill within the cooldown window. Test edge cases around time boundaries. |
| 4 | **Calculate Dragon Combat Power** | Algorithm Design, Stats Calculation | ++ Medium | Create a `calculateCombatPower()` method in `StatsCalculator` that weighs stats differently based on dragon's element and skills. Factor in elemental advantages and skill synergies. Write parameterized tests. |
| 5 | **Implement Quest Failure Logic** | Business Logic, State Transitions | ++ Medium | Add a `failQuest()` method to `QuestService` that handles quest failure scenarios (timeout, dragon defeated). Apply penalties to dragon stats and update quest status. Test various failure conditions. |
| 6 | **Dragon Evolution System** | Complex State Transformation, Validation | +++ Hard | Implement `EvolutionService.evolveDragon()` that checks evolution requirements, applies breed-specific stat multipliers from `BreedRepository`, and updates evolution stage. Handle edge cases like max evolution. |
| 7 | **Multi-Level Training Progression** | Complex Calculation, Loop Logic | +++ Hard | Enhance `TrainingService.completeTrainingSession()` to handle multiple level-ups in a single session. Ensure experience overflow is correctly carried to next level. Add tests for edge cases (e.g., gaining 500 XP at level 1). |
| 8 | **Elemental Advantage Calculator** | Domain Logic, Matrix Calculations | +++ Hard | Create an `ElementalAdvantageCalculator` utility that calculates damage multipliers based on elemental matchups (Fire > Earth > Lightning > Water > Fire). Support neutral and resistant elements. Write comprehensive test matrix. |
| 9 | **Simple Dragon Breeding** | Genetics Algorithm, Randomization | ++++ Very Hard | Implement `BreedingService.breedDragons()` that validates parent compatibility, averages parent stats with random variance (±10%), inherits element from random parent, and creates offspring. Test breeding rules and stat inheritance. |
| 10 | **Turn-Based Battle Simulator** | Complex Algorithm, State Machine | +++++ Expert | Create `BattleService.simulateBattle()` with turn-based combat: initiative based on speed, damage calculation with attack/defense, skill usage with elemental modifiers, and battle log generation. Test various combat scenarios and edge cases. |

## Notes on Exercise Design

**Skill Areas Covered:**

- **Input Validation** - Exercises 1, 6
- **Data Filtering & Queries** - Exercise 2
- **State Management** - Exercises 3, 5, 6
- **Algorithm Design** - Exercises 4, 8, 9, 10
- **Complex Business Logic** - Exercises 5, 6, 7
- **Mathematical Calculations** - Exercises 4, 7, 8
- **Randomization & Genetics** - Exercise 9
- **State Machines** - Exercise 10

**Existing Code Leverage:**

- All exercises build on existing services, models, and utilities
- Tests can follow established patterns in `tests/services/`
- Repositories and data structures are already in place
- Type system provides strong contracts

**Progressive Difficulty:**

- Exercises 1-2: Single method additions with straightforward logic
- Exercises 3-5: Multi-step logic with state management
- Exercises 6-8: Complex transformations and calculations
- Exercises 9-10: Advanced algorithms requiring multiple systems integration
