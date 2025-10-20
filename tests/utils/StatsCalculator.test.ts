import { StatsCalculator } from '../../src/utils'
import { Stats } from '../../src/types'

describe('StatsCalculator', () => {
    const baseStats: Stats = {
        hp: 100,
        attack: 50,
        defense: 40,
        speed: 30,
        magic: 20
    }

    describe('multiplyStats', () => {
        it('should multiply all stats by the given multiplier', () => {
            const result = StatsCalculator.multiplyStats(baseStats, 2)
            expect(result.hp).toBe(200)
            expect(result.attack).toBe(100)
            expect(result.defense).toBe(80)
            expect(result.speed).toBe(60)
            expect(result.magic).toBe(40)
        })

        it('should floor decimal results', () => {
            const result = StatsCalculator.multiplyStats(baseStats, 1.5)
            expect(result.hp).toBe(150)
            expect(result.attack).toBe(75)
        })
    })

    describe('applyMultipliers', () => {
        it('should apply individual multipliers to each stat', () => {
            const multipliers: Stats = { hp: 2, attack: 1.5, defense: 1, speed: 1.2, magic: 0.8 }
            const result = StatsCalculator.applyMultipliers(baseStats, multipliers)
            expect(result.hp).toBe(200)
            expect(result.attack).toBe(75)
            expect(result.defense).toBe(40)
            expect(result.speed).toBe(36)
            expect(result.magic).toBe(16)
        })
    })

    describe('addStats', () => {
        it('should add two stats together', () => {
            const stats2: Stats = { hp: 50, attack: 25, defense: 20, speed: 15, magic: 10 }
            const result = StatsCalculator.addStats(baseStats, stats2)
            expect(result.hp).toBe(150)
            expect(result.attack).toBe(75)
        })
    })

    describe('averageStats', () => {
        it('should calculate average of two stats', () => {
            const stats2: Stats = { hp: 200, attack: 100, defense: 80, speed: 60, magic: 40 }
            const result = StatsCalculator.averageStats(baseStats, stats2)
            expect(result.hp).toBe(150)
            expect(result.attack).toBe(75)
        })
    })

    describe('calculateTotalPower', () => {
        it('should sum all stats', () => {
            const total = StatsCalculator.calculateTotalPower(baseStats)
            expect(total).toBe(240)
        })
    })
})
