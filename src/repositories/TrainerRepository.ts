import { Trainer } from '../types'

export class TrainerRepository {
    private trainers: Map<string, Trainer> = new Map()

    save(trainer: Trainer): Trainer {
        this.trainers.set(trainer.id, trainer)
        return trainer
    }

    findById(id: string): Trainer | undefined {
        return this.trainers.get(id)
    }

    findAll(): Trainer[] {
        return Array.from(this.trainers.values())
    }

    findByEmail(email: string): Trainer | undefined {
        return this.findAll().find(t => t.email === email)
    }

    update(trainer: Trainer): Trainer {
        if (!this.trainers.has(trainer.id)) {
            throw new Error(`Trainer with id ${trainer.id} not found`)
        }
        this.trainers.set(trainer.id, trainer)
        return trainer
    }

    delete(id: string): boolean {
        return this.trainers.delete(id)
    }

    clear(): void {
        this.trainers.clear()
    }

    count(): number {
        return this.trainers.size
    }
}
