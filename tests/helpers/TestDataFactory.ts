import { Dragon, Trainer, Element, EvolutionStage } from '../../src/types'

export class TestDataFactory {
    static createDragon(overrides?: Partial<Dragon>): Dragon {
        return {
            id: 'dragon-1',
            name: 'Test Dragon',
            breedId: 'fire-dragon',
            level: 1,
            experience: 0,
            stats: { hp: 100, attack: 50, defense: 40, speed: 30, magic: 20 },
            elementalAffinity: Element.Fire,
            evolutionStage: EvolutionStage.Hatchling,
            skillIds: [],
            ...overrides
        }
    }

    static createTrainer(overrides?: Partial<Trainer>): Trainer {
        return {
            id: 'trainer-1',
            name: 'Test Trainer',
            email: 'test@example.com',
            registrationDate: new Date('2025-01-01'),
            dragonIds: [],
            ...overrides
        }
    }

    static createMultipleDragons(count: number): Dragon[] {
        return Array.from({ length: count }, (_, i) => 
            this.createDragon({
                id: `dragon-${i + 1}`,
                name: `Dragon ${i + 1}`
            })
        )
    }

    static createMultipleTrainers(count: number): Trainer[] {
        return Array.from({ length: count }, (_, i) => 
            this.createTrainer({
                id: `trainer-${i + 1}`,
                name: `Trainer ${i + 1}`,
                email: `trainer${i + 1}@example.com`
            })
        )
    }
}
