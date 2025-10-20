export class ValidationHelper {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    static isValidId(id: string): boolean {
        return id !== null && id !== undefined && id.trim().length > 0
    }

    static isPositiveNumber(value: number): boolean {
        return typeof value === 'number' && value > 0 && !isNaN(value)
    }

    static isNonNegativeNumber(value: number): boolean {
        return typeof value === 'number' && value >= 0 && !isNaN(value)
    }

    static isInRange(value: number, min: number, max: number): boolean {
        return value >= min && value <= max
    }

    static requireNonNull<T>(value: T | null | undefined, message: string): T {
        if (value === null || value === undefined) {
            throw new Error(message)
        }
        return value
    }

    static requireTrue(condition: boolean, message: string): void {
        if (!condition) {
            throw new Error(message)
        }
    }
}
