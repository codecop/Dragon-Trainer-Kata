import { TrainerService } from '../../src/services/TrainerService'
import { TrainerRepository, DragonRepository } from '../../src/repositories'
import { TestDataFactory } from '../helpers/TestDataFactory'

describe('TrainerService', () => {
    let service: TrainerService
    let trainerRepository: TrainerRepository
    let dragonRepository: DragonRepository

    beforeEach(() => {
        trainerRepository = new TrainerRepository()
        dragonRepository = new DragonRepository()
        service = new TrainerService(trainerRepository, dragonRepository)
    })

    describe('registerTrainer', () => {
        it('should register a new trainer with valid data', () => {
            const trainer = service.registerTrainer('John Doe', 'john@example.com')
            
            expect(trainer.name).toBe('John Doe')
            expect(trainer.email).toBe('john@example.com')
            expect(trainer.id).toBeDefined()
            expect(trainer.dragonIds).toEqual([])
            expect(trainer.registrationDate).toBeInstanceOf(Date)
        })

        it('should trim trainer name', () => {
            const trainer = service.registerTrainer('  John Doe  ', 'john@example.com')
            expect(trainer.name).toBe('John Doe')
        })

        it('should lowercase email', () => {
            const trainer = service.registerTrainer('John Doe', 'John@Example.COM')
            expect(trainer.email).toBe('john@example.com')
        })

        it('should reject empty name', () => {
            expect(() => service.registerTrainer('', 'john@example.com')).toThrow('Name cannot be empty')
            expect(() => service.registerTrainer('   ', 'john@example.com')).toThrow('Name cannot be empty')
        })

        it('should reject invalid email', () => {
            expect(() => service.registerTrainer('John Doe', 'invalid')).toThrow('Invalid email format')
            expect(() => service.registerTrainer('John Doe', 'test@')).toThrow('Invalid email format')
        })

        it('should reject duplicate email', () => {
            service.registerTrainer('John Doe', 'john@example.com')
            expect(() => service.registerTrainer('Jane Doe', 'john@example.com')).toThrow('already exists')
        })
    })

    describe('listTrainers', () => {
        beforeEach(() => {
            service.registerTrainer('Alice', 'alice@example.com')
            service.registerTrainer('Bob', 'bob@example.com')
            service.registerTrainer('Charlie', 'charlie@example.com')
            service.registerTrainer('David', 'david@example.com')
        })

        it('should return all trainers with default pagination', () => {
            const trainers = service.listTrainers()
            expect(trainers).toHaveLength(4)
        })

        it('should paginate correctly', () => {
            const page1 = service.listTrainers(1, 2)
            expect(page1).toHaveLength(2)
            
            const page2 = service.listTrainers(2, 2)
            expect(page2).toHaveLength(2)
            
            expect(page1[0].id).not.toBe(page2[0].id)
        })

        it('should sort trainers by name', () => {
            const trainers = service.listTrainers()
            expect(trainers[0].name).toBe('Alice')
            expect(trainers[1].name).toBe('Bob')
            expect(trainers[2].name).toBe('Charlie')
            expect(trainers[3].name).toBe('David')
        })

        it('should filter by name', () => {
            const trainers = service.listTrainers(1, 10, 'ali')
            expect(trainers).toHaveLength(1)
            expect(trainers[0].name).toBe('Alice')
        })

        it('should filter by email', () => {
            const trainers = service.listTrainers(1, 10, 'bob@')
            expect(trainers).toHaveLength(1)
            expect(trainers[0].email).toBe('bob@example.com')
        })

        it('should return empty array when no trainers match filter', () => {
            const trainers = service.listTrainers(1, 10, 'nonexistent')
            expect(trainers).toEqual([])
        })

        it('should reject invalid page number', () => {
            expect(() => service.listTrainers(0, 10)).toThrow('Page must be greater than 0')
            expect(() => service.listTrainers(-1, 10)).toThrow('Page must be greater than 0')
        })

        it('should reject invalid limit', () => {
            expect(() => service.listTrainers(1, 0)).toThrow('Limit must be greater than 0')
            expect(() => service.listTrainers(1, -1)).toThrow('Limit must be greater than 0')
        })
    })

    describe('assignDragonToTrainer', () => {
        let trainerId: string
        let dragonId: string

        beforeEach(() => {
            const trainer = service.registerTrainer('John Doe', 'john@example.com')
            trainerId = trainer.id
            
            const dragon = TestDataFactory.createDragon({ id: 'dragon-1' })
            dragonRepository.save(dragon)
            dragonId = dragon.id
        })

        it('should assign dragon to trainer', () => {
            service.assignDragonToTrainer(dragonId, trainerId)
            
            const trainer = trainerRepository.findById(trainerId)
            const dragon = dragonRepository.findById(dragonId)
            
            expect(trainer?.dragonIds).toContain(dragonId)
            expect(dragon?.trainerId).toBe(trainerId)
        })

        it('should throw error when trainer not found', () => {
            expect(() => service.assignDragonToTrainer(dragonId, 'non-existent')).toThrow('Trainer with id non-existent not found')
        })

        it('should throw error when dragon not found', () => {
            expect(() => service.assignDragonToTrainer('non-existent', trainerId)).toThrow('Dragon with id non-existent not found')
        })

        it('should throw error when dragon already assigned', () => {
            service.assignDragonToTrainer(dragonId, trainerId)
            
            const trainer2 = service.registerTrainer('Jane Doe', 'jane@example.com')
            expect(() => service.assignDragonToTrainer(dragonId, trainer2.id)).toThrow('already assigned')
        })
    })

    describe('getTrainerById', () => {
        it('should return trainer by id', () => {
            const registered = service.registerTrainer('John Doe', 'john@example.com')
            const found = service.getTrainerById(registered.id)
            
            expect(found).toEqual(registered)
        })

        it('should throw error when trainer not found', () => {
            expect(() => service.getTrainerById('non-existent')).toThrow('Trainer with id non-existent not found')
        })
    })
})
