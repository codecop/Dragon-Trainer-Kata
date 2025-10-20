import { QuestService } from '../../src/services/QuestService'
import { DragonService } from '../../src/services/DragonService'
import { TrainingService } from '../../src/services/TrainingService'
import { DragonRepository, BreedRepository, QuestRepository, SkillRepository } from '../../src/repositories'
import { QuestStatus } from '../../src/types'

describe('QuestService', () => {
    let questService: QuestService
    let dragonService: DragonService
    let trainingService: TrainingService
    let dragonRepository: DragonRepository
    let breedRepository: BreedRepository
    let questRepository: QuestRepository
    let skillRepository: SkillRepository

    beforeEach(() => {
        dragonRepository = new DragonRepository()
        breedRepository = new BreedRepository()
        questRepository = new QuestRepository()
        skillRepository = new SkillRepository()
        dragonService = new DragonService(dragonRepository, breedRepository)
        trainingService = new TrainingService(dragonRepository, skillRepository)
        questService = new QuestService(questRepository, dragonRepository, skillRepository)
    })

    describe('getAvailableQuests', () => {
        it('should return quests dragon can take', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            const quests = questService.getAvailableQuests(dragon.id)
            
            expect(quests.length).toBeGreaterThan(0)
            expect(quests.every(q => q.levelRequirement <= dragon.level)).toBe(true)
        })

        it('should filter by level requirement', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            const quests = questService.getAvailableQuests(dragon.id)
            
            const highLevelQuest = questRepository.findAll().find(q => q.levelRequirement > dragon.level)
            if (highLevelQuest) {
                expect(quests.find(q => q.id === highLevelQuest.id)).toBeUndefined()
            }
        })

        it('should filter by element requirement', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            const quests = questService.getAvailableQuests(dragon.id)
            
            quests.forEach(quest => {
                if (quest.elementRequirement) {
                    expect(quest.elementRequirement).toBe(dragon.elementalAffinity)
                }
            })
        })

        it('should filter by required skills', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            dragon.level = 20
            dragonRepository.update(dragon)
            
            const quests = questService.getAvailableQuests(dragon.id)
            
            const questWithSkillReq = questRepository.findAll().find(q => q.requiredSkillIds.length > 0)
            if (questWithSkillReq) {
                expect(quests.find(q => q.id === questWithSkillReq.id)).toBeUndefined()
            }
        })

        it('should include quest when all requirements met', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            dragon.level = 15
            dragonRepository.update(dragon)
            trainingService.learnSkill(dragon.id, 'fireball')
            
            const quests = questService.getAvailableQuests(dragon.id)
            
            const volcanoQuest = quests.find(q => q.id === 'quest-2')
            expect(volcanoQuest).toBeDefined()
        })

        it('should throw error when dragon not found', () => {
            expect(() => questService.getAvailableQuests('non-existent')).toThrow('Dragon with id non-existent not found')
        })
    })

    describe('startQuest', () => {
        it('should start quest for dragon', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            const quest = questService.startQuest(dragon.id, 'quest-1')
            
            expect(quest.status).toBe(QuestStatus.Active)
            expect(quest.dragonId).toBe(dragon.id)
        })

        it('should throw error when dragon not found', () => {
            expect(() => questService.startQuest('non-existent', 'quest-1')).toThrow('Dragon with id non-existent not found')
        })

        it('should throw error when quest not found', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => questService.startQuest(dragon.id, 'non-existent')).toThrow('Quest with id non-existent not found')
        })

        it('should throw error when quest not available', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            questService.startQuest(dragon.id, 'quest-1')
            
            const dragon2 = dragonService.createDragon('water-dragon', 'Aqua')
            expect(() => questService.startQuest(dragon2.id, 'quest-1')).toThrow('Quest quest-1 is not available')
        })

        it('should throw error when dragon does not meet requirements', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            
            expect(() => questService.startQuest(dragon.id, 'quest-4')).toThrow('Dragon does not meet quest requirements')
        })
    })

    describe('completeQuest', () => {
        it('should complete quest and award experience', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            questService.startQuest(dragon.id, 'quest-1')
            
            const quest = questService.completeQuest(dragon.id, 'quest-1', 0.5)
            
            expect(quest.status).toBe(QuestStatus.Completed)
            
            const updated = dragonRepository.findById(dragon.id)
            expect(updated?.experience).toBe(50)
        })

        it('should scale experience by performance', () => {
            const dragon1 = dragonService.createDragon('fire-dragon', 'Dragon1')
            const dragon2 = dragonService.createDragon('fire-dragon', 'Dragon2')
            
            questService.startQuest(dragon1.id, 'quest-1')
            questService.completeQuest(dragon1.id, 'quest-1', 0.8)
            
            const quest2 = questRepository.findById('quest-1')
            if (quest2) {
                quest2.status = QuestStatus.Available
                quest2.dragonId = undefined
                questRepository.update(quest2)
            }
            
            questService.startQuest(dragon2.id, 'quest-1')
            questService.completeQuest(dragon2.id, 'quest-1', 0.4)
            
            const updated1 = dragonRepository.findById(dragon1.id)
            const updated2 = dragonRepository.findById(dragon2.id)
            
            expect(updated1?.experience).toBe(80)
            expect(updated2?.experience).toBe(40)
        })

        it('should level up dragon if threshold reached', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            questService.startQuest(dragon.id, 'quest-1')
            
            questService.completeQuest(dragon.id, 'quest-1', 1.0)
            
            const updated = dragonRepository.findById(dragon.id)
            expect(updated?.level).toBeGreaterThanOrEqual(1)
        })

        it('should throw error when performance out of range', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            questService.startQuest(dragon.id, 'quest-1')
            
            expect(() => questService.completeQuest(dragon.id, 'quest-1', -0.1)).toThrow('Performance must be between 0 and 1')
            expect(() => questService.completeQuest(dragon.id, 'quest-1', 1.1)).toThrow('Performance must be between 0 and 1')
        })

        it('should throw error when dragon not found', () => {
            expect(() => questService.completeQuest('non-existent', 'quest-1', 1.0)).toThrow('Dragon with id non-existent not found')
        })

        it('should throw error when quest not found', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => questService.completeQuest(dragon.id, 'non-existent', 1.0)).toThrow('Quest with id non-existent not found')
        })

        it('should throw error when quest not in progress', () => {
            const dragon = dragonService.createDragon('fire-dragon', 'Flamewing')
            expect(() => questService.completeQuest(dragon.id, 'quest-1', 1.0)).toThrow('Quest quest-1 is not in progress')
        })

        it('should throw error when quest assigned to different dragon', () => {
            const dragon1 = dragonService.createDragon('fire-dragon', 'Dragon1')
            const dragon2 = dragonService.createDragon('fire-dragon', 'Dragon2')
            
            questService.startQuest(dragon1.id, 'quest-1')
            
            expect(() => questService.completeQuest(dragon2.id, 'quest-1', 1.0)).toThrow('Quest quest-1 is not assigned to dragon')
        })
    })

    describe('getQuestById', () => {
        it('should return quest by id', () => {
            const quest = questService.getQuestById('quest-1')
            expect(quest.id).toBe('quest-1')
        })

        it('should throw error when quest not found', () => {
            expect(() => questService.getQuestById('non-existent')).toThrow('Quest with id non-existent not found')
        })
    })

    describe('getAllQuests', () => {
        it('should return all quests', () => {
            const quests = questService.getAllQuests()
            expect(quests.length).toBeGreaterThan(0)
        })
    })
})
