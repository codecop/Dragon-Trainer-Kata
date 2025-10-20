import { Dragon, TrainingSession } from '../types'
import { DragonRepository, SkillRepository } from '../repositories'
import { ExperienceCalculator, ValidationHelper } from '../utils'

export class TrainingService {
    private trainingSessions: Map<string, TrainingSession> = new Map()

    constructor(
        private dragonRepository: DragonRepository,
        private skillRepository: SkillRepository
    ) { }

    private generateId(): string {
        return `training-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    learnSkill(dragonId: string, skillId: string): Dragon {
        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        const skill = this.skillRepository.findById(skillId)
        if (!skill) {
            throw new Error(`Skill with id ${skillId} not found`)
        }

        if (dragon.skillIds.includes(skillId)) {
            throw new Error(`Dragon already knows skill ${skillId}`)
        }

        if (dragon.level < skill.levelRequirement) {
            throw new Error(`Dragon level ${dragon.level} is below required level ${skill.levelRequirement}`)
        }

        for (const prereqId of skill.prerequisiteSkillIds) {
            if (!dragon.skillIds.includes(prereqId)) {
                throw new Error(`Dragon does not have prerequisite skill ${prereqId}`)
            }
        }

        dragon.skillIds.push(skillId)
        return this.dragonRepository.update(dragon)
    }

    completeTrainingSession(dragonId: string, skillId: string, duration: number): TrainingSession {
        ValidationHelper.requireTrue(duration > 0, 'Duration must be positive')

        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        const skill = this.skillRepository.findById(skillId)
        if (!skill) {
            throw new Error(`Skill with id ${skillId} not found`)
        }

        if (!dragon.skillIds.includes(skillId)) {
            throw new Error(`Dragon does not know skill ${skillId}`)
        }

        const skillMultiplier = 1.0
        const experienceGained = ExperienceCalculator.calculateTrainingExperience(duration, skillMultiplier)

        const session: TrainingSession = {
            id: this.generateId(),
            dragonId,
            skillId,
            timestamp: new Date(),
            duration,
            experienceGained
        }

        dragon.experience += experienceGained

        const levelUpThreshold = ExperienceCalculator.getLevelThreshold(dragon.level)
        if (dragon.experience >= levelUpThreshold) {
            dragon.level++
            dragon.experience -= levelUpThreshold
        }

        this.dragonRepository.update(dragon)
        this.trainingSessions.set(session.id, session)

        return session
    }

    getTrainingHistory(dragonId: string): TrainingSession[] {
        return Array.from(this.trainingSessions.values())
            .filter(session => session.dragonId === dragonId)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }
}
