import { Trainer } from '../types'
import { TrainerRepository, DragonRepository } from '../repositories'
import { ValidationHelper } from '../utils'

export class TrainerService {
    constructor(
        private trainerRepository: TrainerRepository,
        private dragonRepository: DragonRepository
    ) { }

    private generateId(): string {
        return `trainer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    registerTrainer(name: string, email: string): Trainer {
        ValidationHelper.requireTrue(name.trim().length > 0, 'Name cannot be empty')
        ValidationHelper.requireTrue(ValidationHelper.isValidEmail(email), 'Invalid email format')

        const existingTrainer = this.trainerRepository.findByEmail(email)
        if (existingTrainer) {
            throw new Error(`Trainer with email ${email} already exists`)
        }

        const trainer: Trainer = {
            id: this.generateId(),
            name: name.trim(),
            email: email.toLowerCase(),
            registrationDate: new Date(),
            dragonIds: []
        }

        return this.trainerRepository.save(trainer)
    }

    listTrainers(page = 1, limit = 10, filter?: string): Trainer[] {
        ValidationHelper.requireTrue(page > 0, 'Page must be greater than 0')
        ValidationHelper.requireTrue(limit > 0, 'Limit must be greater than 0')

        let trainers = this.trainerRepository.findAll()

        if (filter) {
            const lowerFilter = filter.toLowerCase()
            trainers = trainers.filter(t => 
                t.name.toLowerCase().includes(lowerFilter) || 
                t.email.toLowerCase().includes(lowerFilter)
            )
        }

        trainers.sort((a, b) => a.name.localeCompare(b.name))

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        return trainers.slice(startIndex, endIndex)
    }

    assignDragonToTrainer(dragonId: string, trainerId: string): void {
        const trainer = this.trainerRepository.findById(trainerId)
        if (!trainer) {
            throw new Error(`Trainer with id ${trainerId} not found`)
        }

        const dragon = this.dragonRepository.findById(dragonId)
        if (!dragon) {
            throw new Error(`Dragon with id ${dragonId} not found`)
        }

        if (dragon.trainerId) {
            throw new Error(`Dragon ${dragonId} is already assigned to trainer ${dragon.trainerId}`)
        }

        dragon.trainerId = trainerId
        if (!trainer.dragonIds.includes(dragonId)) {
            trainer.dragonIds.push(dragonId)
        }

        this.dragonRepository.update(dragon)
        this.trainerRepository.update(trainer)
    }

    getTrainerById(trainerId: string): Trainer {
        const trainer = this.trainerRepository.findById(trainerId)
        if (!trainer) {
            throw new Error(`Trainer with id ${trainerId} not found`)
        }
        return trainer
    }
}
