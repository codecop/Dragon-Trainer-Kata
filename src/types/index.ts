import { Element, EvolutionStage, QuestStatus, QuestDifficulty, SkillCategory, SkillType } from './enums'

export * from './enums'

export interface Stats {
    hp: number
    attack: number
    defense: number
    speed: number
    magic: number
}

export interface Dragon {
    id: string
    name: string
    breedId: string
    trainerId?: string
    level: number
    experience: number
    stats: Stats
    elementalAffinity: Element
    evolutionStage: EvolutionStage
    skillIds: string[]
    questId?: string
    breedingCooldownUntil?: Date
}

export interface Trainer {
    id: string
    name: string
    email: string
    registrationDate: Date
    dragonIds: string[]
}

export interface Breed {
    id: string
    name: string
    baseStats: Stats
    elementalAffinity: Element
    evolutionRules: EvolutionRule[]
}

export interface EvolutionRule {
    fromStage: EvolutionStage
    toStage: EvolutionStage
    levelRequired: number
    statMultipliers: Stats
}

export interface Skill {
    id: string
    name: string
    category: SkillCategory
    type: SkillType
    levelRequirement: number
    prerequisiteSkillIds: string[]
    power: number
    element?: Element
}

export interface TrainingSession {
    id: string
    dragonId: string
    skillId: string
    timestamp: Date
    duration: number
    experienceGained: number
}

export interface Quest {
    id: string
    name: string
    description: string
    difficulty: QuestDifficulty
    levelRequirement: number
    elementRequirement?: Element
    requiredSkillIds: string[]
    rewards: QuestReward
    status: QuestStatus
}

export interface QuestReward {
    experience: number
    items: string[]
}

export interface DragonSkillProficiency {
    skillId: string
    proficiency: number
    masteryLevel: number
}

export interface BattleState {
    turn: number
    dragon1Hp: number
    dragon2Hp: number
    log: string[]
}

export interface BattleResult {
    winnerId: string
    loserId: string
    turns: number
    log: string[]
}
