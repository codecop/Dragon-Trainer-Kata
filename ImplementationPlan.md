# Implementation Plan for Dragon Breeding & Training Academy

## Execution Order Overview

1. **Foundation** - Types, models, utilities
2. **Infrastructure** - Repositories and test infrastructure
3. **Core Services** - Basic CRUD operations
4. **Business Logic** - Medium complexity features
5. **Advanced Features** - High complexity systems

---

## Phase 1: Foundation - Types & Models (≈200 LoC)

**1.1 Define Core Types & Enums**

- [ ] Element types (Fire, Water, Earth, Air, etc.)
- [ ] Dragon evolution stages (Hatchling, Juvenile, Adult, Elder)
- [ ] Quest status, difficulty levels
- [ ] Skill categories and types

**1.2 Entity Models**

- [ ] `Dragon` - id, name, breedId, trainerId, level, stats, elementalAffinity, evolutionStage, skills
- [ ] `Trainer` - id, name, email, registrationDate, dragonIds
- [ ] `Breed` - id, name, baseStats, elementalAffinity, evolutionRules
- [ ] `Skill` - id, name, category, levelRequirement, prerequisites
- [ ] `TrainingSession` - id, dragonId, skillId, timestamp, experienceGained
- [ ] `Quest` - id, name, difficulty, requirements, rewards

**1.3 Utility Classes**

- [ ] `StatsCalculator` - Stat calculations, modifiers, scaling
- [ ] `ExperienceCalculator` - XP curves, level thresholds
- [ ] `RandomGenerator` - Seeded random for breeding/battles
- [ ] `ValidationHelper` - Common validation logic

---

## Phase 2: Infrastructure - Repositories & Test Setup (≈300 LoC)

**2.1 Repository Layer (In-Memory)**

- [ ] `DragonRepository` - CRUD operations with in-memory storage
- [ ] `TrainerRepository` - CRUD operations with in-memory storage
- [ ] `BreedRepository` - Pre-populated breed data
- [ ] `SkillRepository` - Pre-populated skill catalog
- [ ] `QuestRepository` - Quest management

**2.2 Test Infrastructure**

- [ ] `MockDragonRepository` - In-memory dragon storage
- [ ] `MockTrainerRepository` - In-memory trainer storage
- [ ] `MockBreedRepository` - Pre-populated breed data
- [ ] `MockSkillRepository` - Pre-populated skill catalog
- [ ] `MockQuestRepository` - Quest test data
- [ ] `TestDataFactory` - Create test dragons, trainers, etc.
- [ ] `AssertionHelpers` - Custom assertions for domain objects
- [ ] `TestSetup` - Common test configuration

---

## Phase 3: Core Services - Basic CRUD (≈330 LoC)

**3.1 TrainerService**

- [ ] `registerTrainer(name, email)` - UC #3
- [ ] `listTrainers(pagination, filters)` - UC #2
- [ ] `assignDragonToTrainer(dragonId, trainerId)` - UC #4

**3.2 DragonService (Basic)**

- [ ] `getDragonDetails(dragonId)` - UC #1
- [ ] `createDragon(breedId, name, trainerId)` - UC #5
  - [ ] Lookup breed, calculate base stats, assign elemental affinity

---

## Phase 4: Business Logic - Medium Complexity (≈500 LoC)

**4.1 TrainingService**

- [ ] `learnSkill(dragonId, skillId)` - UC #7
  - [ ] Validate level requirements and prerequisites
- [ ] `completeTrainingSession(dragonId, skillId, duration)` - UC #6
  - [ ] Calculate experience based on duration and skill
  - [ ] Update dragon's skill proficiency
  - [ ] Check for level-up triggers

**4.2 QuestService**

- [ ] `getAvailableQuests(dragonId)` - UC #8
  - [ ] Filter by dragon level and elemental requirements
- [ ] `startQuest(dragonId, questId)` - UC #9
  - [ ] Validate requirements (level, element, skills)
  - [ ] Set quest status to active
- [ ] `completeQuest(dragonId, questId, performance)` - UC #10
  - [ ] Calculate rewards based on performance metrics
  - [ ] Award experience, items, currency
  - [ ] Update dragon stats

---

## Phase 5: Advanced Features - High Complexity (≈600 LoC)

**5.1 EvolutionService**

- [ ] `evolveDragon(dragonId)` - UC #11
  - [ ] Check evolution threshold
  - [ ] Apply breed-specific transformation rules
  - [ ] Recalculate all stats with multipliers
  - [ ] Update evolution stage

**5.2 BreedingService**

- [ ] `breedDragons(parent1Id, parent2Id)` - UC #12
  - [ ] Validate breeding compatibility
  - [ ] Genetics algorithm for trait inheritance
  - [ ] Randomize mutations
  - [ ] Create offspring dragon

**5.3 SkillProgressionService**

- [ ] `trackSkillUsage(dragonId, skillId, context)` - UC #13
  - [ ] Record skill usage
  - [ ] Calculate proficiency gains
  - [ ] Check for ability unlocks
  - [ ] Manage skill trees

**5.4 TournamentService**

- [ ] `findMatch(dragonId)` - UC #14
  - [ ] Matchmaking algorithm considering level, skills, elements
  - [ ] Calculate compatibility scores
  - [ ] Balance matchups

**5.5 BattleService**

- [ ] `simulateBattle(dragon1Id, dragon2Id)` - UC #15
  - [ ] Turn-based combat engine
  - [ ] Damage calculations with elemental modifiers
  - [ ] Skill execution and effects
  - [ ] Status effect management
  - [ ] Battle outcome determination

## Estimated Line Distribution

- Types & Models: ~400 LoC
- Repositories: ~300 LoC
- Services (Low): ~300 LoC
- Services (Medium): ~500 LoC
- Services (High): ~600 LoC
- Utilities: ~200 LoC
- **Total: ~2300 LoC** (slightly over target, can be optimized)

This plan follows the service/layered architecture, builds complexity incrementally, and ensures each use case is fully implemented with proper business logic.

---

# Detailed Service Implementation Plan with Tests

## Service Architecture

Each service follows this structure:

- **Service Class** - Business logic methods (~50-150 LoC per service)
- **Test Suite** - Comprehensive unit tests (~80-200 LoC per service)
- **Mock Repositories** - Test doubles for isolation

---

## Phase 1: TrainerService + Tests (≈150 LoC)

### TrainerService Implementation (~70 LoC)

- [ ] `registerTrainer(name: string, email: string): Trainer`
  - [ ] Validate email format
  - [ ] Check for duplicate email
  - [ ] Create trainer with generated ID
  - [ ] Save to repository
- [ ] `listTrainers(page: number, limit: number, filter?: string): Trainer[]`
  - [ ] Pagination logic
  - [ ] Optional name/email filtering
  - [ ] Return sorted results
- [ ] `assignDragonToTrainer(dragonId: string, trainerId: string): void`
  - [ ] Validate trainer exists
  - [ ] Validate dragon exists and is unassigned
  - [ ] Update both entities

### TrainerService Tests (~80 LoC)

- [ ] `registerTrainer` tests
  - [ ] Should create trainer with valid data
  - [ ] Should reject invalid email
  - [ ] Should reject duplicate email
- [ ] `listTrainers` tests
  - [ ] Should paginate correctly
  - [ ] Should filter by name
  - [ ] Should return empty array when no trainers
- [ ] `assignDragonToTrainer` tests
  - [ ] Should link dragon to trainer
  - [ ] Should throw when trainer not found
  - [ ] Should throw when dragon already assigned

---

## Phase 2: DragonService (Basic) + Tests (≈180 LoC)

### DragonService Implementation (~80 LoC)

- [ ] `getDragonDetails(dragonId: string): DragonDetails`
  - [ ] Fetch dragon from repository
  - [ ] Enrich with breed information
  - [ ] Include skill details
  - [ ] Format stats for display
- [ ] `createDragon(breedId: string, name: string, trainerId?: string): Dragon`
  - [ ] Validate breed exists
  - [ ] Lookup breed base stats
  - [ ] Calculate initial stats
  - [ ] Assign elemental affinity from breed
  - [ ] Set evolution stage to Hatchling
  - [ ] Save to repository

### DragonService Tests (~100 LoC)

- [ ] `getDragonDetails` tests
  - [ ] Should return complete dragon details
  - [ ] Should include breed information
  - [ ] Should throw when dragon not found
  - [ ] Should handle dragon without skills
- [ ] `createDragon` tests
  - [ ] Should create dragon with breed stats
  - [ ] Should assign correct elemental affinity
  - [ ] Should start at Hatchling stage
  - [ ] Should throw when breed not found
  - [ ] Should link to trainer if provided

---

## Phase 3: TrainingService + Tests (≈200 LoC)

### TrainingService Implementation (~90 LoC)

- [ ] `completeTrainingSession(dragonId: string, skillId: string, duration: number): TrainingResult`
  - [ ] Validate dragon and skill exist
  - [ ] Calculate experience gain (duration × skill multiplier)
  - [ ] Update skill proficiency
  - [ ] Check for level-up
  - [ ] Record training session
  - [ ] Return results with level-up flag
- [ ] `learnSkill(dragonId: string, skillId: string): void`
  - [ ] Validate dragon level meets requirement
  - [ ] Check prerequisites are met
  - [ ] Validate skill not already learned
  - [ ] Add skill to dragon
  - [ ] Initialize proficiency at 0

### TrainingService Tests (~110 LoC)

- [ ] `completeTrainingSession` tests
  - [ ] Should award experience correctly
  - [ ] Should increase skill proficiency
  - [ ] Should trigger level-up when threshold reached
  - [ ] Should record training session
  - [ ] Should throw when dragon not found
- [ ] `learnSkill` tests
  - [ ] Should add skill to dragon
  - [ ] Should reject if level too low
  - [ ] Should reject if prerequisites not met
  - [ ] Should reject if skill already learned
  - [ ] Should initialize proficiency to zero

---

## Phase 4: QuestService + Tests (≈250 LoC)

### QuestService Implementation (~120 LoC)

- [ ] `getAvailableQuests(dragonId: string): Quest[]`
  - [ ] Fetch dragon details
  - [ ] Filter quests by level range
  - [ ] Filter by elemental requirements
  - [ ] Filter by skill requirements
  - [ ] Exclude already completed quests
  - [ ] Return sorted by difficulty
- [ ] `startQuest(dragonId: string, questId: string): void`
  - [ ] Validate quest available
  - [ ] Check dragon not on another quest
  - [ ] Validate all requirements met
  - [ ] Set quest status to active
  - [ ] Record start time
- [ ] `completeQuest(dragonId: string, questId: string, performance: number): QuestReward`
  - [ ] Validate quest is active
  - [ ] Calculate base rewards
  - [ ] Apply performance multiplier
  - [ ] Award experience to dragon
  - [ ] Distribute loot items
  - [ ] Update quest status to completed
  - [ ] Return reward summary

### QuestService Tests (~130 LoC)

- [ ] `getAvailableQuests` tests
  - [ ] Should filter by dragon level
  - [ ] Should filter by elemental affinity
  - [ ] Should exclude completed quests
  - [ ] Should return empty for low-level dragon
  - [ ] Should include quests matching requirements
- [ ] `startQuest` tests
  - [ ] Should activate quest
  - [ ] Should throw if requirements not met
  - [ ] Should throw if dragon on another quest
  - [ ] Should record start time
- [ ] `completeQuest` tests
  - [ ] Should calculate rewards correctly
  - [ ] Should apply performance multiplier
  - [ ] Should award experience
  - [ ] Should throw if quest not active
  - [ ] Should mark quest as completed

---

## Phase 5: EvolutionService + Tests (≈180 LoC)

### EvolutionService Implementation (~80 LoC)

- [ ] `checkEvolutionEligibility(dragonId: string): boolean`
  - [ ] Check current evolution stage
  - [ ] Verify level threshold reached
  - [ ] Check breed-specific requirements
- [ ] `evolveDragon(dragonId: string): Dragon`
  - [ ] Validate evolution eligible
  - [ ] Determine next evolution stage
  - [ ] Apply stat multipliers from breed
  - [ ] Recalculate all stats
  - [ ] Update evolution stage
  - [ ] Unlock stage-specific abilities
  - [ ] Save and return evolved dragon

### EvolutionService Tests (~100 LoC)

- [ ] `checkEvolutionEligibility` tests
  - [ ] Should return true when eligible
  - [ ] Should return false when level too low
  - [ ] Should return false at max stage
- [ ] `evolveDragon` tests
  - [ ] Should advance evolution stage
  - [ ] Should multiply stats correctly
  - [ ] Should unlock new abilities
  - [ ] Should throw if not eligible
  - [ ] Should handle each evolution stage transition

---

## Phase 6: BreedingService + Tests (≈220 LoC)

### BreedingService Implementation (~100 LoC)

- [ ] `validateBreedingPair(dragon1Id: string, dragon2Id: string): ValidationResult`
  - [ ] Check both dragons exist
  - [ ] Validate minimum level requirement
  - [ ] Check breeding cooldown
  - [ ] Verify compatible breeds
- [ ] `breedDragons(dragon1Id: string, dragon2Id: string): Dragon`
  - [ ] Validate breeding pair
  - [ ] Determine offspring breed (genetics algorithm)
  - [ ] Inherit traits from parents
  - [ ] Calculate base stats with inheritance
  - [ ] Apply random mutations (5% chance)
  - [ ] Determine elemental affinity
  - [ ] Create offspring dragon
  - [ ] Set breeding cooldown on parents

### BreedingService Tests (~120 LoC)

- [ ] `validateBreedingPair` tests
  - [ ] Should pass for valid pair
  - [ ] Should fail if level too low
  - [ ] Should fail if on cooldown
  - [ ] Should fail for incompatible breeds
- [ ] `breedDragons` tests
  - [ ] Should create offspring
  - [ ] Should inherit traits from parents
  - [ ] Should apply mutations randomly
  - [ ] Should set cooldown on parents
  - [ ] Should calculate stats correctly
  - [ ] Should handle same-breed parents
  - [ ] Should handle cross-breed parents

---

## Phase 7: SkillProgressionService + Tests (≈200 LoC)

### SkillProgressionService Implementation (~90 LoC)

- [ ] `trackSkillUsage(dragonId: string, skillId: string, effectiveness: number): ProgressionResult`
  - [ ] Validate dragon has skill
  - [ ] Calculate proficiency gain
  - [ ] Update skill proficiency
  - [ ] Check for mastery thresholds
  - [ ] Unlock advanced abilities if mastered
  - [ ] Return progression details
- [ ] `getSkillTree(dragonId: string): SkillTree`
  - [ ] Fetch dragon's current skills
  - [ ] Build skill tree with dependencies
  - [ ] Mark unlocked/locked skills
  - [ ] Show progression percentages

### SkillProgressionService Tests (~110 LoC)

- [ ] `trackSkillUsage` tests
  - [ ] Should increase proficiency
  - [ ] Should scale gain by effectiveness
  - [ ] Should unlock abilities at mastery
  - [ ] Should cap proficiency at maximum
  - [ ] Should throw if skill not learned
- [ ] `getSkillTree` tests
  - [ ] Should show all available skills
  - [ ] Should mark learned skills
  - [ ] Should show locked prerequisites
  - [ ] Should calculate progression percentages

---

## Phase 8: TournamentService + Tests (≈180 LoC)

### TournamentService Implementation (~80 LoC)

- [ ] `findMatch(dragonId: string): Dragon`
  - [ ] Fetch dragon details
  - [ ] Find dragons in level range (±3 levels)
  - [ ] Calculate compatibility scores
  - [ ] Factor in elemental advantages
  - [ ] Consider skill matchups
  - [ ] Apply ELO-style rating
  - [ ] Return best match
- [ ] `calculateMatchScore(dragon1: Dragon, dragon2: Dragon): number`
  - [ ] Level difference penalty
  - [ ] Elemental advantage/disadvantage
  - [ ] Skill diversity comparison
  - [ ] Return normalized score

### TournamentService Tests (~100 LoC)

- [ ] `findMatch` tests
  - [ ] Should find dragon in level range
  - [ ] Should prefer balanced matchups
  - [ ] Should consider elemental matchups
  - [ ] Should return null if no matches
  - [ ] Should exclude dragons on quests
- [ ] `calculateMatchScore` tests
  - [ ] Should penalize large level gaps
  - [ ] Should favor elemental balance
  - [ ] Should score skill diversity

---

## Phase 9: BattleService + Tests (≈280 LoC)

### BattleService Implementation (~150 LoC)

- [ ] `simulateBattle(dragon1Id: string, dragon2Id: string): BattleResult`
  - [ ] Initialize battle state
  - [ ] Determine turn order (speed stat)
  - [ ] Execute turn loop until winner
  - [ ] Return battle log and outcome
- [ ] `executeTurn(attacker: Dragon, defender: Dragon, state: BattleState): TurnResult`
  - [ ] Select skill (AI logic)
  - [ ] Calculate base damage
  - [ ] Apply elemental modifiers
  - [ ] Apply status effects
  - [ ] Update defender HP
  - [ ] Check for knockout
- [ ] `calculateDamage(attacker: Dragon, defender: Dragon, skill: Skill): number`
  - [ ] Base damage from skill and attack stat
  - [ ] Elemental multiplier (2x advantage, 0.5x disadvantage)
  - [ ] Defense reduction
  - [ ] Random variance (±10%)

### BattleService Tests (~130 LoC)

- [ ] `simulateBattle` tests
  - [ ] Should determine winner correctly
  - [ ] Should apply elemental advantages
  - [ ] Should use skills appropriately
  - [ ] Should handle status effects
  - [ ] Should generate complete battle log
- [ ] `executeTurn` tests
  - [ ] Should calculate damage correctly
  - [ ] Should reduce defender HP
  - [ ] Should detect knockout
  - [ ] Should apply skill effects
- [ ] `calculateDamage` tests
  - [ ] Should apply elemental multipliers
  - [ ] Should factor in defense
  - [ ] Should include variance
  - [ ] Should handle critical hits

---

## Test Infrastructure (≈150 LoC)

### Mock Repositories (~80 LoC)

- [ ] `MockDragonRepository` - In-memory dragon storage
- [ ] `MockTrainerRepository` - In-memory trainer storage
- [ ] `MockBreedRepository` - Pre-populated breed data
- [ ] `MockSkillRepository` - Pre-populated skill catalog
- [ ] `MockQuestRepository` - Quest test data

### Test Utilities (~70 LoC)

- [ ] `TestDataFactory` - Create test dragons, trainers, etc.
- [ ] `AssertionHelpers` - Custom assertions for domain objects
- [ ] `TestSetup` - Common test configuration

---

## Service Implementation Summary

| Service | Implementation | Tests | Total |
|---------|---------------|-------|-------|
| TrainerService | 70 | 80 | 150 |
| DragonService (Basic) | 80 | 100 | 180 |
| TrainingService | 90 | 110 | 200 |
| QuestService | 120 | 130 | 250 |
| EvolutionService | 80 | 100 | 180 |
| BreedingService | 100 | 120 | 220 |
| SkillProgressionService | 90 | 110 | 200 |
| TournamentService | 80 | 100 | 180 |
| BattleService | 150 | 130 | 280 |
| Test Infrastructure | - | 150 | 150 |
| **Total** | **860** | **1030** | **1990** |

## Service Implementation Order

### Step 1: Foundation - Types & Models

- [ ] Implement core types and enums
- [ ] Implement entity models
- [ ] Implement utility classes
- [ ] Run basic validation tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 2: Infrastructure - Repositories

- [ ] Implement all repository classes
- [ ] Implement test infrastructure (mocks, factories, helpers)
- [ ] Run repository tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 3: TrainerService

- [ ] Implement TrainerService
- [ ] Implement TrainerService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 4: DragonService (Basic)

- [ ] Implement DragonService basic methods
- [ ] Implement DragonService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 5: TrainingService

- [ ] Implement TrainingService
- [ ] Implement TrainingService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 6: QuestService

- [ ] Implement QuestService (all methods)
- [ ] Implement QuestService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 7: EvolutionService

- [ ] Implement EvolutionService
- [ ] Implement EvolutionService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 8: BreedingService

- [ ] Implement BreedingService
- [ ] Implement BreedingService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 9: SkillProgressionService

- [ ] Implement SkillProgressionService
- [ ] Implement SkillProgressionService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 10: TournamentService

- [ ] Implement TournamentService
- [ ] Implement TournamentService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

### Step 11: BattleService

- [ ] Implement BattleService
- [ ] Implement BattleService tests
- [ ] Run tests
- [ ] Present results to user
- [ ] Wait for feedback
- [ ] Commit changes

## Implementation Workflow

Each step follows this workflow:

1. **Implement** - Write the service class and/or test suite
2. **Run Tests** - Execute all tests for the current service
3. **Present Results** - Show test output, coverage, and any issues
4. **Wait for Feedback** - Pause for user review and approval
5. **Commit** - Create a git commit with descriptive message

This ensures each service is fully validated before moving to the next, maintaining code quality and catching issues early.
