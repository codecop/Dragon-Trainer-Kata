import { Element, EvolutionStage, Stats } from '../types'

export class DragonModel {
    constructor(
        public id: string,
        public name: string,
        public breedId: string,
        public level: number,
        public experience: number,
        public stats: Stats,
        public elementalAffinity: Element,
        public evolutionStage: EvolutionStage,
        public skillIds: string[] = [],
        public trainerId?: string,
        public questId?: string,
        public breedingCooldownUntil?: Date
    ) { }

    addSkill(skillId: string): void {
        if (!this.skillIds.includes(skillId)) {
            this.skillIds.push(skillId)
        }
    }

    removeSkill(skillId: string): void {
        this.skillIds = this.skillIds.filter(id => id !== skillId)
    }

    gainExperience(amount: number): boolean {
        this.experience += amount
        const levelUpThreshold = this.level * 100
        if (this.experience >= levelUpThreshold) {
            this.level++
            this.experience -= levelUpThreshold
            return true
        }
        return false
    }

    isOnQuest(): boolean {
        return !!this.questId
    }

    canBreed(): boolean {
        if (!this.breedingCooldownUntil) {return true}
        return new Date() >= this.breedingCooldownUntil
    }
}
