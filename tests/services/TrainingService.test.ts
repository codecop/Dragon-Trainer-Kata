import { TrainingService } from '../../src/services/TrainingService'
import { DragonService } from '../../src/services/DragonService'
import { DragonRepository, BreedRepository, SkillRepository } from '../../src/repositories'

describe('TrainingService', () => {
    let trainingService: TrainingService
    let dragonService: DragonService
    let dragonRepository: DragonRepository
    let breedRepository: BreedRepository
    let skillRepository: SkillRepository

    beforeEach(() => {
        dragonRepository = new DragonRepository()
        breedRepository = new BreedRepository()
        skillRepository = new SkillRepository()
        dragonService = new DragonService(dragonRepository, breedRepository)
        trainingService = new TrainingService(dragonRepository, skillRepository)
    })

    describe('learnSkill', () => {
        it('should add skill to dragon', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            const updated = trainingService.learnSkill(dragon.id, 'fireball')
            
            expect(updated.skillIds).toContain('fireball')
            expect(updated.skillIds).toHaveLength(1)
        })

        it('should throw error when dragon not found', () => {
            expect(() => trainingService.learnSkill('non-existent', 'fireball')).toThrow('Dragon with id non-existent not found')
        })

        it('should throw error when skill not found', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => trainingService.learnSkill(dragon.id, 'non-existent')).toThrow('Skill with id non-existent not found')
        })

        it('should throw error when dragon already knows skill', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            expect(() => trainingService.learnSkill(dragon.id, 'fireball')).toThrow('Dragon already knows skill fireball')
        })

        it('should throw error when dragon level too low', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            expect(() => trainingService.learnSkill(dragon.id, 'flame-burst')).toThrow('Dragon level 1 is below required level 15')
        })

        it('should throw error when prerequisite skill missing', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            dragon.level = 20
            dragonRepository.update(dragon)
            
            expect(() => trainingService.learnSkill(dragon.id, 'flame-burst')).toThrow('Dragon does not have prerequisite skill fireball')
        })

        it('should allow learning skill with prerequisites met', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            dragon.level = 20
            dragonRepository.update(dragon)
            
            trainingService.learnSkill(dragon.id, 'fireball')
            const updated = trainingService.learnSkill(dragon.id, 'flame-burst')
            
            expect(updated.skillIds).toContain('fireball')
            expect(updated.skillIds).toContain('flame-burst')
        })
    })

    describe('completeTrainingSession', () => {
        it('should create training session and award experience', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            const session = trainingService.completeTrainingSession(dragon.id, 'fireball', 10)
            
            expect(session.dragonId).toBe(dragon.id)
            expect(session.skillId).toBe('fireball')
            expect(session.duration).toBe(10)
            expect(session.experienceGained).toBe(100)
            expect(session.id).toBeDefined()
            expect(session.timestamp).toBeInstanceOf(Date)
        })

        it('should update dragon experience', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            trainingService.completeTrainingSession(dragon.id, 'fireball', 5)
            
            const updated = dragonRepository.findById(dragon.id)
            expect(updated?.experience).toBe(50)
        })

        it('should level up dragon when threshold reached', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            trainingService.completeTrainingSession(dragon.id, 'fireball', 10)
            
            const updated = dragonRepository.findById(dragon.id)
            expect(updated?.level).toBe(2)
            expect(updated?.experience).toBe(0)
        })

        it('should throw error when dragon not found', () => {
            expect(() => trainingService.completeTrainingSession('non-existent', 'fireball', 10)).toThrow('Dragon with id non-existent not found')
        })

        it('should throw error when skill not found', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => trainingService.completeTrainingSession(dragon.id, 'non-existent', 10)).toThrow('Skill with id non-existent not found')
        })

        it('should throw error when dragon does not know skill', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => trainingService.completeTrainingSession(dragon.id, 'fireball', 10)).toThrow('Dragon does not know skill fireball')
        })

        it('should throw error when duration is not positive', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            expect(() => trainingService.completeTrainingSession(dragon.id, 'fireball', 0)).toThrow('Duration must be positive')
            expect(() => trainingService.completeTrainingSession(dragon.id, 'fireball', -5)).toThrow('Duration must be positive')
        })
    })

    describe('getTrainingHistory', () => {
        it('should return training sessions for dragon', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            trainingService.learnSkill(dragon.id, 'fireball')
            
            const session1 = trainingService.completeTrainingSession(dragon.id, 'fireball', 5)
            const session2 = trainingService.completeTrainingSession(dragon.id, 'fireball', 10)
            
            const history = trainingService.getTrainingHistory(dragon.id)
            expect(history).toHaveLength(2)
            const sessionIds = history.map(s => s.id)
            expect(sessionIds).toContain(session1.id)
            expect(sessionIds).toContain(session2.id)
        })

        it('should return empty array when no training sessions', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            const history = trainingService.getTrainingHistory(dragon.id)
            expect(history).toEqual([])
        })

        it('should only return sessions for specific dragon', () => {
            const dragon1 = dragonService.createDragon('fire-dragon', 'Dragon1')
            const dragon2 = dragonService.createDragon('water-dragon', 'Dragon2')
            
            trainingService.learnSkill(dragon1.id, 'fireball')
            trainingService.learnSkill(dragon2.id, 'water-jet')
            
            trainingService.completeTrainingSession(dragon1.id, 'fireball', 5)
            trainingService.completeTrainingSession(dragon2.id, 'water-jet', 10)
            
            const history1 = trainingService.getTrainingHistory(dragon1.id)
            expect(history1).toHaveLength(1)
            expect(history1[0].skillId).toBe('fireball')
        })
    })
})
