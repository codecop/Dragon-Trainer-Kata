import { DragonRepository } from '../../src/repositories'
import { TestDataFactory } from '../helpers/TestDataFactory'

describe('DragonRepository', () => {
    let repository: DragonRepository

    beforeEach(() => {
        repository = new DragonRepository()
    })

    describe('save', () => {
        it('should save a dragon', () => {
            const dragon = TestDataFactory.createDragon()
            const saved = repository.save(dragon)
            expect(saved).toEqual(dragon)
            expect(repository.count()).toBe(1)
        })
    })

    describe('findById', () => {
        it('should find dragon by id', () => {
            const dragon = TestDataFactory.createDragon()
            repository.save(dragon)
            const found = repository.findById(dragon.id)
            expect(found).toEqual(dragon)
        })

        it('should return undefined for non-existent id', () => {
            const found = repository.findById('non-existent')
            expect(found).toBeUndefined()
        })
    })

    describe('findAll', () => {
        it('should return all dragons', () => {
            const dragons = TestDataFactory.createMultipleDragons(3)
            dragons.forEach(d => repository.save(d))
            const all = repository.findAll()
            expect(all).toHaveLength(3)
        })

        it('should return empty array when no dragons', () => {
            const all = repository.findAll()
            expect(all).toEqual([])
        })
    })

    describe('findByTrainerId', () => {
        it('should find dragons by trainer id', () => {
            const dragon1 = TestDataFactory.createDragon({ id: 'd1', trainerId: 't1' })
            const dragon2 = TestDataFactory.createDragon({ id: 'd2', trainerId: 't1' })
            const dragon3 = TestDataFactory.createDragon({ id: 'd3', trainerId: 't2' })
            repository.save(dragon1)
            repository.save(dragon2)
            repository.save(dragon3)

            const found = repository.findByTrainerId('t1')
            expect(found).toHaveLength(2)
            expect(found.map(d => d.id)).toContain('d1')
            expect(found.map(d => d.id)).toContain('d2')
        })
    })

    describe('update', () => {
        it('should update existing dragon', () => {
            const dragon = TestDataFactory.createDragon()
            repository.save(dragon)
            const updated = { ...dragon, level: 5 }
            repository.update(updated)
            const found = repository.findById(dragon.id)
            expect(found?.level).toBe(5)
        })

        it('should throw error for non-existent dragon', () => {
            const dragon = TestDataFactory.createDragon()
            expect(() => repository.update(dragon)).toThrow()
        })
    })

    describe('delete', () => {
        it('should delete dragon', () => {
            const dragon = TestDataFactory.createDragon()
            repository.save(dragon)
            const deleted = repository.delete(dragon.id)
            expect(deleted).toBe(true)
            expect(repository.count()).toBe(0)
        })

        it('should return false for non-existent dragon', () => {
            const deleted = repository.delete('non-existent')
            expect(deleted).toBe(false)
        })
    })

    describe('clear', () => {
        it('should clear all dragons', () => {
            const dragons = TestDataFactory.createMultipleDragons(3)
            dragons.forEach(d => repository.save(d))
            repository.clear()
            expect(repository.count()).toBe(0)
        })
    })
})
