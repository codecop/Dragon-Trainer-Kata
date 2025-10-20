import { Quest, QuestStatus, Dragon } from '../types'
import { QuestRepository, DragonRepository, SkillRepository } from '../repositories'
import { ExperienceCalculator } from '../utils'

export class QuestService {
    constructor(
        private questRepository: QuestRepository,
        private dragonRepository: DragonRepository,
        private skillRepository: SkillRepository
    ) { }

    getAvailableQuests(dragonId: string): Quest[] {
        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        return this.questRepository.findByStatus(QuestStatus.Available)
            .filter(quest => this.canDragonTakeQuest(dragon, quest))
    }

    private canDragonTakeQuest(dragon: Dragon, quest: Quest): boolean {
        if (dragon.level < quest.levelRequirement) {
            return false
        }

        if (quest.elementRequirement && dragon.elementalAffinity !== quest.elementRequirement) {
            return false
        }

        for (const skillId of quest.requiredSkillIds) {
            if (!dragon.skillIds.includes(skillId)) {
                return false
            }
        }

        return true
    }

    startQuest(dragonId: string, questId: string): Quest {
        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        const quest = this.questRepository.findById(questId)
        if (!quest) {
            throw new Error(`Quest with id ${questId} not found`)
        }

        if (quest.status !== QuestStatus.Available) {
            throw new Error(`Quest ${questId} is not available`)
        }

        if (!this.canDragonTakeQuest(dragon, quest)) {
            throw new Error(`Dragon does not meet quest requirements`)
        }

        quest.status = QuestStatus.Active
        quest.dragonId = dragonId
        return this.questRepository.update(quest)
    }

    completeQuest(dragonId: string, questId: string, performance: number): Quest {
        if (performance < 0 || performance > 1) {
            throw new Error('Performance must be between 0 and 1')
        }

        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        const quest = this.questRepository.findById(questId)
        if (!quest) {
            throw new Error(`Quest with id ${questId} not found`)
        }

        if (quest.status !== QuestStatus.Active) {
            throw new Error(`Quest ${questId} is not in progress`)
        }

        if (quest.dragonId !== dragonId) {
            throw new Error(`Quest ${questId} is not assigned to dragon ${dragonId}`)
        }

        const baseExperience = quest.rewards.experience
        const experienceGained = Math.floor(baseExperience * performance)
        dragon.experience += experienceGained

        let levelUpThreshold = ExperienceCalculator.getLevelThreshold(dragon.level)
        while (dragon.experience >= levelUpThreshold) {
            dragon.level++
            dragon.experience -= levelUpThreshold
            levelUpThreshold = ExperienceCalculator.getLevelThreshold(dragon.level)
        }

        this.dragonRepository.update(dragon)

        quest.status = QuestStatus.Completed
        return this.questRepository.update(quest)
    }

    getQuestById(questId: string): Quest {
        const quest = this.questRepository.findById(questId)
        if (!quest) {
            throw new Error(`Quest with id ${questId} not found`)
        }
        return quest
    }

    getAllQuests(): Quest[] {
        return this.questRepository.findAll()
    }
}
