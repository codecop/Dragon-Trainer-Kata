import { Stats } from '../types'

export class StatsCalculator {
    static multiplyStats(baseStats: Stats, multiplier: number): Stats {
        return {
            hp: Math.floor(baseStats.hp * multiplier),
            attack: Math.floor(baseStats.attack * multiplier),
            defense: Math.floor(baseStats.defense * multiplier),
            speed: Math.floor(baseStats.speed * multiplier),
            magic: Math.floor(baseStats.magic * multiplier)
        }
    }

    static applyMultipliers(baseStats: Stats, multipliers: Stats): Stats {
        return {
            hp: Math.floor(baseStats.hp * multipliers.hp),
            attack: Math.floor(baseStats.attack * multipliers.attack),
            defense: Math.floor(baseStats.defense * multipliers.defense),
            speed: Math.floor(baseStats.speed * multipliers.speed),
            magic: Math.floor(baseStats.magic * multipliers.magic)
        }
    }

    static addStats(stats1: Stats, stats2: Stats): Stats {
        return {
            hp: stats1.hp + stats2.hp,
            attack: stats1.attack + stats2.attack,
            defense: stats1.defense + stats2.defense,
            speed: stats1.speed + stats2.speed,
            magic: stats1.magic + stats2.magic
        }
    }

    static averageStats(stats1: Stats, stats2: Stats): Stats {
        return {
            hp: Math.floor((stats1.hp + stats2.hp) / 2),
            attack: Math.floor((stats1.attack + stats2.attack) / 2),
            defense: Math.floor((stats1.defense + stats2.defense) / 2),
            speed: Math.floor((stats1.speed + stats2.speed) / 2),
            magic: Math.floor((stats1.magic + stats2.magic) / 2)
        }
    }

    static calculateTotalPower(stats: Stats): number {
        return stats.hp + stats.attack + stats.defense + stats.speed + stats.magic
    }
}
