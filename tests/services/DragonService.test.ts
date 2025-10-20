import { DragonService } from '../../src/services/DragonService'
import { DragonRepository, BreedRepository } from '../../src/repositories'
import { Element, EvolutionStage } from '../../src/types'

describe('DragonService', () => {
    let service: DragonService
    let dragonRepository: DragonRepository
    let breedRepository: BreedRepository

    beforeEach(() => {
        dragonRepository = new DragonRepository()
        breedRepository = new BreedRepository()
        service = new DragonService(dragonRepository, breedRepository)
    })

    describe('createDragon', () => {
        it('should create a dragon with breed stats', () => {
            const dragon = service.createDragon('fire-dragon', 'Flamewing')
            
            expect(dragon.name).toBe('Flamewing')
            expect(dragon.breedId).toBe('fire-dragon')
            expect(dragon.level).toBe(1)
            expect(dragon.experience).toBe(0)
            expect(dragon.elementalAffinity).toBe(Element.Fire)
            expect(dragon.evolutionStage).toBe(EvolutionStage.Hatchling)
            expect(dragon.stats.hp).toBe(100)
            expect(dragon.stats.attack).toBe(80)
            expect(dragon.id).toBeDefined()
        })

        it('should create dragon with trainer assignment', () => {
            const dragon = service.createDragon('water-dragon', 'Aquarius', 'trainer-1')
            
            expect(dragon.trainerId).toBe('trainer-1')
            expect(dragon.elementalAffinity).toBe(Element.Water)
        })

        it('should trim dragon name', () => {
            const dragon = service.createDragon('fire-dragon', '  Flamewing  ')
            expect(dragon.name).toBe('Flamewing')
        })

        it('should throw error for invalid breed', () => {
            expect(() => service.createDragon('invalid-breed', 'Dragon')).toThrow('Breed with id invalid-breed not found')
        })

        it('should create dragon with correct base stats from breed', () => {
            const dragon = service.createDragon('lightning-dragon', 'Bolt')
            
            expect(dragon.stats.hp).toBe(90)
            expect(dragon.stats.speed).toBe(90)
            expect(dragon.elementalAffinity).toBe(Element.Lightning)
        })

        it('should initialize dragon with empty skill list', () => {
            const dragon = service.createDragon('fire-dragon', 'Test')
            expect(dragon.skillIds).toEqual([])
        })
    })

    describe('getDragonDetails', () => {
        it('should return dragon details', () => {
            const created = service.createDragon('fire-dragon', 'Flamewing')
            const dragon = service.getDragonDetails(created.id)
            
            expect(dragon).toEqual(created)
            expect(dragon.name).toBe('Flamewing')
        })

        it('should throw error when dragon not found', () => {
            expect(() => service.getDragonDetails('non-existent')).toThrow('Dragon with id non-existent not found')
        })
    })

    describe('listDragons', () => {
        it('should return all dragons', () => {
            service.createDragon('fire-dragon', 'Dragon1')
            service.createDragon('water-dragon', 'Dragon2')
            service.createDragon('lightning-dragon', 'Dragon3')
            
            const dragons = service.listDragons()
            expect(dragons).toHaveLength(3)
        })

        it('should return empty array when no dragons', () => {
            const dragons = service.listDragons()
            expect(dragons).toEqual([])
        })
    })

    describe('getDragonsByTrainer', () => {
        it('should return dragons for specific trainer', () => {
            service.createDragon('fire-dragon', 'Dragon1', 'trainer-1')
            service.createDragon('water-dragon', 'Dragon2', 'trainer-1')
            service.createDragon('lightning-dragon', 'Dragon3', 'trainer-2')
            
            const dragons = service.getDragonsByTrainer('trainer-1')
            expect(dragons).toHaveLength(2)
            expect(dragons.every(d => d.trainerId === 'trainer-1')).toBe(true)
        })

        it('should return empty array when trainer has no dragons', () => {
            const dragons = service.getDragonsByTrainer('trainer-1')
            expect(dragons).toEqual([])
        })
    })

    describe('updateDragon', () => {
        it('should update dragon', () => {
            const dragon = service.createDragon('fire-dragon', 'Flamewing')
            dragon.level = 5
            dragon.experience = 250
            
            const updated = service.updateDragon(dragon)
            expect(updated.level).toBe(5)
            expect(updated.experience).toBe(250)
            
            const retrieved = service.getDragonDetails(dragon.id)
            expect(retrieved.level).toBe(5)
        })

        it('should throw error when updating non-existent dragon', () => {
            const fakeDragon = service.createDragon('fire-dragon', 'Test')
            dragonRepository.delete(fakeDragon.id)
            
            expect(() => service.updateDragon(fakeDragon)).toThrow()
        })
    })
})
