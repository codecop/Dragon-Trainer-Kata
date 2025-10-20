import { ValidationHelper } from '../../src/utils'

describe('ValidationHelper', () => {
    describe('isValidEmail', () => {
        it('should return true for valid emails', () => {
            expect(ValidationHelper.isValidEmail('test@example.com')).toBe(true)
            expect(ValidationHelper.isValidEmail('user.name@domain.co.uk')).toBe(true)
        })

        it('should return false for invalid emails', () => {
            expect(ValidationHelper.isValidEmail('invalid')).toBe(false)
            expect(ValidationHelper.isValidEmail('test@')).toBe(false)
            expect(ValidationHelper.isValidEmail('@example.com')).toBe(false)
        })
    })

    describe('isValidId', () => {
        it('should return true for valid IDs', () => {
            expect(ValidationHelper.isValidId('abc123')).toBe(true)
            expect(ValidationHelper.isValidId('1')).toBe(true)
        })

        it('should return false for invalid IDs', () => {
            expect(ValidationHelper.isValidId('')).toBe(false)
            expect(ValidationHelper.isValidId('   ')).toBe(false)
        })
    })

    describe('isPositiveNumber', () => {
        it('should return true for positive numbers', () => {
            expect(ValidationHelper.isPositiveNumber(1)).toBe(true)
            expect(ValidationHelper.isPositiveNumber(100.5)).toBe(true)
        })

        it('should return false for zero and negative numbers', () => {
            expect(ValidationHelper.isPositiveNumber(0)).toBe(false)
            expect(ValidationHelper.isPositiveNumber(-1)).toBe(false)
        })
    })

    describe('requireNonNull', () => {
        it('should return value if not null', () => {
            expect(ValidationHelper.requireNonNull('test', 'error')).toBe('test')
        })

        it('should throw error if null or undefined', () => {
            expect(() => ValidationHelper.requireNonNull(null, 'Value is null')).toThrow('Value is null')
            expect(() => ValidationHelper.requireNonNull(undefined, 'Value is undefined')).toThrow('Value is undefined')
        })
    })

    describe('requireTrue', () => {
        it('should not throw if condition is true', () => {
            expect(() => ValidationHelper.requireTrue(true, 'error')).not.toThrow()
        })

        it('should throw if condition is false', () => {
            expect(() => ValidationHelper.requireTrue(false, 'Condition failed')).toThrow('Condition failed')
        })
    })
})
