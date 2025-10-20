import { Skill, SkillCategory, SkillType, Element } from '../types'

export class SkillRepository {
    private skills: Map<string, Skill> = new Map()

    constructor() {
        this.initializeSkills()
    }

    private initializeSkills(): void {
        const skills: Skill[] = [
            {
                id: 'fireball',
                name: 'Fireball',
                category: SkillCategory.Combat,
                type: SkillType.Active,
                levelRequirement: 1,
                prerequisiteSkillIds: [],
                power: 50,
                element: Element.Fire
            },
            {
                id: 'flame-burst',
                name: 'Flame Burst',
                category: SkillCategory.Combat,
                type: SkillType.Active,
                levelRequirement: 15,
                prerequisiteSkillIds: ['fireball'],
                power: 100,
                element: Element.Fire
            },
            {
                id: 'water-jet',
                name: 'Water Jet',
                category: SkillCategory.Combat,
                type: SkillType.Active,
                levelRequirement: 1,
                prerequisiteSkillIds: [],
                power: 45,
                element: Element.Water
            },
            {
                id: 'tidal-wave',
                name: 'Tidal Wave',
                category: SkillCategory.Combat,
                type: SkillType.Active,
                levelRequirement: 20,
                prerequisiteSkillIds: ['water-jet'],
                power: 110,
                element: Element.Water
            },
            {
                id: 'lightning-bolt',
                name: 'Lightning Bolt',
                category: SkillCategory.Combat,
                type: SkillType.Active,
                levelRequirement: 1,
                prerequisiteSkillIds: [],
                power: 55,
                element: Element.Lightning
            },
            {
                id: 'iron-scales',
                name: 'Iron Scales',
                category: SkillCategory.Defense,
                type: SkillType.Passive,
                levelRequirement: 5,
                prerequisiteSkillIds: [],
                power: 0
            },
            {
                id: 'regeneration',
                name: 'Regeneration',
                category: SkillCategory.Support,
                type: SkillType.Passive,
                levelRequirement: 10,
                prerequisiteSkillIds: [],
                power: 0
            },
            {
                id: 'speed-boost',
                name: 'Speed Boost',
                category: SkillCategory.Utility,
                type: SkillType.Active,
                levelRequirement: 8,
                prerequisiteSkillIds: [],
                power: 0
            }
        ]

        skills.forEach(skill => this.skills.set(skill.id, skill))
    }

    findById(id: string): Skill | undefined {
        return this.skills.get(id)
    }

    findAll(): Skill[] {
        return Array.from(this.skills.values())
    }

    findByCategory(category: SkillCategory): Skill[] {
        return this.findAll().filter(s => s.category === category)
    }

    findByLevelRequirement(maxLevel: number): Skill[] {
        return this.findAll().filter(s => s.levelRequirement <= maxLevel)
    }

    findByElement(element: Element): Skill[] {
        return this.findAll().filter(s => s.element === element)
    }
}
