import { Dragon } from '../types'
import { DragonRepository, BreedRepository } from '../repositories'

export class DragonService {
    constructor(
        private dragonRepository: DragonRepository,
        private breedRepository: BreedRepository
    ) { }

    private generateId(): string {
        return `dragon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    getDragonDetails(dragonId: string): Dragon {
        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }
        return dragon
    }

    createDragon(breedId: string, name: string, trainerId?: string): Dragon {
        const breed = this.breedRepository.findById(breedId)
        if (!breed) {
            throw new Error(`Breed with id ${breedId} not found`)
        }

        const dragon: Dragon = {
            id: this.generateId(),
            name: name.trim(),
            breedId: breed.id,
            level: 1,
            experience: 0,
            stats: { ...breed.baseStats },
            elementalAffinity: breed.elementalAffinity,
            evolutionStage: breed.evolutionRules[0].fromStage,
            skillIds: [],
            trainerId
        }

        return this.dragonRepository.save(dragon)
    }

    listDragons(): Dragon[] {
        return this.dragonRepository.findAll()
    }

    getDragonsByTrainer(trainerId: string): Dragon[] {
        return this.dragonRepository.findByTrainerId(trainerId)
    }

    updateDragon(dragon: Dragon): Dragon {
        return this.dragonRepository.update(dragon)
    }
}
