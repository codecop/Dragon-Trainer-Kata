import { Breed, Element, EvolutionStage } from '../types'

export class BreedRepository {
    private breeds: Map<string, Breed> = new Map()

    constructor() {
        this.initializeBreeds()
    }

    private initializeBreeds(): void {
        const breeds: Breed[] = [
            {
                id: 'fire-dragon',
                name: 'Fire Dragon',
                baseStats: { hp: 100, attack: 80, defense: 50, speed: 60, magic: 70 },
                elementalAffinity: Element.Fire,
                evolutionRules: [
                    {
                        fromStage: EvolutionStage.Hatchling,
                        toStage: EvolutionStage.Juvenile,
                        levelRequired: 10,
                        statMultipliers: { hp: 1.5, attack: 1.6, defense: 1.4, speed: 1.3, magic: 1.5 }
                    },
                    {
                        fromStage: EvolutionStage.Juvenile,
                        toStage: EvolutionStage.Adult,
                        levelRequired: 25,
                        statMultipliers: { hp: 1.8, attack: 2.0, defense: 1.6, speed: 1.5, magic: 1.8 }
                    },
                    {
                        fromStage: EvolutionStage.Adult,
                        toStage: EvolutionStage.Elder,
                        levelRequired: 50,
                        statMultipliers: { hp: 2.2, attack: 2.5, defense: 2.0, speed: 1.8, magic: 2.3 }
                    }
                ]
            },
            {
                id: 'water-dragon',
                name: 'Water Dragon',
                baseStats: { hp: 120, attack: 60, defense: 70, speed: 50, magic: 60 },
                elementalAffinity: Element.Water,
                evolutionRules: [
                    {
                        fromStage: EvolutionStage.Hatchling,
                        toStage: EvolutionStage.Juvenile,
                        levelRequired: 10,
                        statMultipliers: { hp: 1.6, attack: 1.4, defense: 1.5, speed: 1.3, magic: 1.4 }
                    },
                    {
                        fromStage: EvolutionStage.Juvenile,
                        toStage: EvolutionStage.Adult,
                        levelRequired: 25,
                        statMultipliers: { hp: 2.0, attack: 1.7, defense: 1.9, speed: 1.5, magic: 1.7 }
                    },
                    {
                        fromStage: EvolutionStage.Adult,
                        toStage: EvolutionStage.Elder,
                        levelRequired: 50,
                        statMultipliers: { hp: 2.5, attack: 2.0, defense: 2.3, speed: 1.8, magic: 2.1 }
                    }
                ]
            },
            {
                id: 'lightning-dragon',
                name: 'Lightning Dragon',
                baseStats: { hp: 90, attack: 70, defense: 40, speed: 90, magic: 80 },
                elementalAffinity: Element.Lightning,
                evolutionRules: [
                    {
                        fromStage: EvolutionStage.Hatchling,
                        toStage: EvolutionStage.Juvenile,
                        levelRequired: 10,
                        statMultipliers: { hp: 1.4, attack: 1.5, defense: 1.3, speed: 1.6, magic: 1.6 }
                    },
                    {
                        fromStage: EvolutionStage.Juvenile,
                        toStage: EvolutionStage.Adult,
                        levelRequired: 25,
                        statMultipliers: { hp: 1.7, attack: 1.9, defense: 1.5, speed: 2.0, magic: 2.0 }
                    },
                    {
                        fromStage: EvolutionStage.Adult,
                        toStage: EvolutionStage.Elder,
                        levelRequired: 50,
                        statMultipliers: { hp: 2.0, attack: 2.3, defense: 1.8, speed: 2.5, magic: 2.5 }
                    }
                ]
            }
        ]

        breeds.forEach(breed => this.breeds.set(breed.id, breed))
    }

    findById(id: string): Breed | undefined {
        return this.breeds.get(id)
    }

    findAll(): Breed[] {
        return Array.from(this.breeds.values())
    }

    findByElement(element: Element): Breed[] {
        return this.findAll().filter(b => b.elementalAffinity === element)
    }
}
