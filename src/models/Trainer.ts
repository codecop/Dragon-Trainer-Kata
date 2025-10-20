export class TrainerModel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public registrationDate: Date,
        public dragonIds: string[] = []
    ) { }

    addDragon(dragonId: string): void {
        if (!this.dragonIds.includes(dragonId)) {
            this.dragonIds.push(dragonId)
        }
    }

    removeDragon(dragonId: string): void {
        this.dragonIds = this.dragonIds.filter(id => id !== dragonId)
    }

    hasDragon(dragonId: string): boolean {
        return this.dragonIds.includes(dragonId)
    }
}
