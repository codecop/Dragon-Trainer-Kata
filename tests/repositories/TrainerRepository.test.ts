import { TrainerRepository } from '../../src/repositories'
import { TestDataFactory } from '../helpers/TestDataFactory'

describe('TrainerRepository', () => {
    let repository: TrainerRepository

    beforeEach(() => {
        repository = new TrainerRepository()
    })

    describe('save', () => {
        it('should save a trainer', () => {
            const trainer = TestDataFactory.createTrainer()
            const saved = repository.save(trainer)
            expect(saved).toEqual(trainer)
            expect(repository.count()).toBe(1)
        })
    })

    describe('findById', () => {
        it('should find trainer by id', () => {
            const trainer = TestDataFactory.createTrainer()
            repository.save(trainer)
            const found = repository.findById(trainer.id)
            expect(found).toEqual(trainer)
        })

        it('should return undefined for non-existent id', () => {
            const found = repository.findById('non-existent')
            expect(found).toBeUndefined()
        })
    })

    describe('findByEmail', () => {
        it('should find trainer by email', () => {
            const trainer = TestDataFactory.createTrainer({ email: 'unique@test.com' })
            repository.save(trainer)
            const found = repository.findByEmail('unique@test.com')
            expect(found).toEqual(trainer)
        })

        it('should return undefined for non-existent email', () => {
            const found = repository.findByEmail('nonexistent@test.com')
            expect(found).toBeUndefined()
        })
    })

    describe('findAll', () => {
        it('should return all trainers', () => {
            const trainers = TestDataFactory.createMultipleTrainers(3)
            trainers.forEach(t => repository.save(t))
            const all = repository.findAll()
            expect(all).toHaveLength(3)
        })

        it('should return empty array when no trainers', () => {
            const all = repository.findAll()
            expect(all).toEqual([])
        })
    })

    describe('update', () => {
        it('should update existing trainer', () => {
            const trainer = TestDataFactory.createTrainer()
            repository.save(trainer)
            const updated = { ...trainer, name: 'Updated Name' }
            repository.update(updated)
            const found = repository.findById(trainer.id)
            expect(found?.name).toBe('Updated Name')
        })

        it('should throw error for non-existent trainer', () => {
            const trainer = TestDataFactory.createTrainer()
            expect(() => repository.update(trainer)).toThrow()
        })
    })

    describe('delete', () => {
        it('should delete trainer', () => {
            const trainer = TestDataFactory.createTrainer()
            repository.save(trainer)
            const deleted = repository.delete(trainer.id)
            expect(deleted).toBe(true)
            expect(repository.count()).toBe(0)
        })

        it('should return false for non-existent trainer', () => {
            const deleted = repository.delete('non-existent')
            expect(deleted).toBe(false)
        })
    })

    describe('clear', () => {
        it('should clear all trainers', () => {
            const trainers = TestDataFactory.createMultipleTrainers(3)
            trainers.forEach(t => repository.save(t))
            repository.clear()
            expect(repository.count()).toBe(0)
        })
    })
})
