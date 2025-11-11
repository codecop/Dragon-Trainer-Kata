import { Dragon } from '../types'
import { DragonRepository, BreedRepository } from '../repositories'

export class EvolutionService {
    constructor(
        private dragonRepository: DragonRepository,
        private breedRepository: BreedRepository
    ) { }

}
