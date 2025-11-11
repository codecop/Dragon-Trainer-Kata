import { EvolutionService } from '../../src/services/EvolutionService'
import { DragonRepository, BreedRepository } from '../../src/repositories'
jest.mock('../../src/repositories/DragonRepository')
import { Dragon, Element, EvolutionStage } from '../../src/types'

describe('EvolutionService', () => {
    let service: EvolutionService
    let breedRepository: BreedRepository
    let dragonRepository: DragonRepository

    beforeEach(() => {
        breedRepository = new BreedRepository()
        dragonRepository = new DragonRepository()
        service = new EvolutionService(dragonRepository, breedRepository)
    })

    describe('evolveDragon', () => {
        // checks evolution requirements
        // applies breed-specific stat multipliers from `BreedRepository`
        // updates evolution stage
        // Handle edge cases like max evolution.

        // existing code:
        // export enum EvolutionStage {
        //     Hatchling = 'Hatchling',
        // wann kann er das nächste werden?
        // je nach Breed gibt es Evolution Rules und es hängt am Level
        //     Juvenile = 'Juvenile',
        //     Adult = 'Adult',
        //     Elder = 'Elder'
        // kann nicht weiter evolven

        it('should stay hatchling without experience', () => {
            const breed = breedRepository.findById('fire-dragon')!
            const hatchling: Dragon = {
                id: 'dragon-123412341234',
                name: 'Foo',
                breedId: breed.id,
                level: 1,
                experience: 0,
                stats: { hp: 100, attack: 80, defense: 50, speed: 60, magic: 70 },
                elementalAffinity: Element.Fire,
                evolutionStage: EvolutionStage.Hatchling,
                skillIds: []
            }

            const updated: Dragon = service.evolveDragon(hatchling);

            expect(updated.evolutionStage).toBe(EvolutionStage.Hatchling)
            expect(updated.stats.hp).toBe(100)

            /*
             * 1. Wir haben 50' für den ersten Test. Die Angabe war gering, aber es
             *    reicht eigentlich, man findet alles irgendwie heraus.
             *    Wir wollen nicht alle Services verwenden, daher hard-coded Werte und
             *    mocked services.
             */
        })
    })

})
