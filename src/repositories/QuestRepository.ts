import { Quest, QuestStatus, QuestDifficulty, Element } from '../types'

export class QuestRepository {
    private quests: Map<string, Quest> = new Map()

    constructor() {
        this.initializeQuests()
    }

    private initializeQuests(): void {
        const quests: Quest[] = [
            {
                id: 'quest-1',
                name: 'Forest Patrol',
                description: 'Patrol the forest and defeat minor threats',
                difficulty: QuestDifficulty.Easy,
                levelRequirement: 1,
                requiredSkillIds: [],
                rewards: { experience: 100, items: ['potion'] },
                status: QuestStatus.Available
            },
            {
                id: 'quest-2',
                name: 'Volcano Expedition',
                description: 'Explore the volcano and retrieve fire crystals',
                difficulty: QuestDifficulty.Medium,
                levelRequirement: 10,
                elementRequirement: Element.Fire,
                requiredSkillIds: ['fireball'],
                rewards: { experience: 500, items: ['fire-crystal', 'potion'] },
                status: QuestStatus.Available
            },
            {
                id: 'quest-3',
                name: 'Ocean Depths',
                description: 'Dive into the ocean depths and find the pearl',
                difficulty: QuestDifficulty.Medium,
                levelRequirement: 15,
                elementRequirement: Element.Water,
                requiredSkillIds: ['water-jet'],
                rewards: { experience: 750, items: ['pearl', 'elixir'] },
                status: QuestStatus.Available
            },
            {
                id: 'quest-4',
                name: 'Storm Peak Challenge',
                description: 'Climb the storm peak and face the lightning trial',
                difficulty: QuestDifficulty.Hard,
                levelRequirement: 25,
                elementRequirement: Element.Lightning,
                requiredSkillIds: ['lightning-bolt'],
                rewards: { experience: 1500, items: ['storm-gem', 'elixir', 'rare-scroll'] },
                status: QuestStatus.Available
            },
            {
                id: 'quest-5',
                name: 'Ancient Dragon Trial',
                description: 'Face the ancient dragon in the forbidden temple',
                difficulty: QuestDifficulty.Legendary,
                levelRequirement: 50,
                requiredSkillIds: [],
                rewards: { experience: 5000, items: ['legendary-artifact', 'master-elixir'] },
                status: QuestStatus.Available
            }
        ]

        quests.forEach(quest => this.quests.set(quest.id, quest))
    }

    save(quest: Quest): Quest {
        this.quests.set(quest.id, quest)
        return quest
    }

    findById(id: string): Quest | undefined {
        return this.quests.get(id)
    }

    findAll(): Quest[] {
        return Array.from(this.quests.values())
    }

    findByStatus(status: QuestStatus): Quest[] {
        return this.findAll().filter(q => q.status === status)
    }

    findByDifficulty(difficulty: QuestDifficulty): Quest[] {
        return this.findAll().filter(q => q.difficulty === difficulty)
    }

    update(quest: Quest): Quest {
        if (!this.quests.has(quest.id)) {
            throw new Error(`Quest with id ${quest.id} not found`)
        }
        this.quests.set(quest.id, quest)
        return quest
    }
}
