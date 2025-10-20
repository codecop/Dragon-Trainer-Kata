import { Dragon } from '../types'

export class DragonRepository {
    private dragons: Map<string, Dragon> = new Map()

    save(dragon: Dragon): Dragon {
        this.dragons.set(dragon.id, dragon)
        return dragon
    }

    findById(id: string): Dragon | undefined {
        return this.dragons.get(id)
    }

    findAll(): Dragon[] {
        return Array.from(this.dragons.values())
    }

    findByTrainerId(trainerId: string): Dragon[] {
        return this.findAll().filter(d => d.trainerId === trainerId)
    }

    update(dragon: Dragon): Dragon {
        if (!this.dragons.has(dragon.id)) {
            throw new Error(`Dragon with id ${dragon.id} not found`)
        }
        this.dragons.set(dragon.id, dragon)
        return dragon
    }

    delete(id: string): boolean {
        return this.dragons.delete(id)
    }

    clear(): void {
        this.dragons.clear()
    }

    count(): number {
        return this.dragons.size
    }
}
