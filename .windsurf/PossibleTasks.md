# Possible Tasks

* fix bug in level up logic in all 3 places: **Location:** `DragonModel.gainExperience()` vs `QuestService.completeQuest()` vs `TrainingService.completeTrainingSession()`
* remove duplication of ID generation logic: **Location:** `DragonService.generateId()`, `TrainerService.generateId()`, `TrainingService.generateId()`
* remove primitive obsession, e.g. `dragonId: string`, `trainerId: string`, `skillId: string`, levels, experience, etc...
* Package by Feature: split types and enums (cohesive domain model packages, e.g. Quest + everything about quests)
