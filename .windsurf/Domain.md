# Domain: Dragon Breeding & Training Academy

* Entities: Dragons, Trainers, Breeds, Skills, Training Sessions, Quests.
* Business logic: Dragon evolution, skill progression, breeding genetics, quest assignments, elemental affinities.
* Rich state management with fantasy progression systems.

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
