export class ExperienceCalculator {
    static getLevelThreshold(level: number): number {
        return level * 100
    }

    static calculateExperienceForNextLevel(currentLevel: number, currentExp: number): number {
        const threshold = this.getLevelThreshold(currentLevel)
        return threshold - currentExp
    }

    static calculateTrainingExperience(duration: number, skillMultiplier: number = 1.0): number {
        return Math.floor(duration * 10 * skillMultiplier)
    }

    static calculateQuestExperience(difficulty: number, performance: number): number {
        const baseExp = difficulty * 50
        return Math.floor(baseExp * performance)
    }

    static calculateLevelFromExperience(totalExperience: number): number {
        let level = 1
        let expNeeded = 0
        while (totalExperience >= expNeeded) {
            expNeeded += this.getLevelThreshold(level)
            if (totalExperience >= expNeeded) {
                level++
            }
        }
        return level
    }
}
