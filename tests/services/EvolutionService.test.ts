import { BreedRepository, DragonRepository } from "../../src/repositories";
import { DragonService } from "../../src/services";
import { Dragon, EvolutionStage } from "../../src/types";

describe('EvolutionService', () => {

    let dragonService: DragonService

    beforeEach(() => {
        // TODO create our own breed for this test later
        let dragonRepository: DragonRepository
        let breedRepository: BreedRepository
        dragonRepository = new DragonRepository()
        breedRepository = new BreedRepository()
        dragonService = new DragonService(dragonRepository, breedRepository)
    })

    it('maximally evolved dragon should not evolve', () => {
        const maxEvolvedDragon: Dragon = dragonService.createDragon('fire-dragon', 'DragonName');
        // is this allowed in domain to set?
        maxEvolvedDragon.evolutionStage = EvolutionStage.Elder;

        // add act as second step
        // const evolutionService = new EvolutionService();
        // evolutionService.evolve(maxEvolvedDragon);

        expect(maxEvolvedDragon.evolutionStage).toBe(EvolutionStage.Elder);
    });

    // other simplest test?
    // X: maybe new dragon experience 0 does not evolve
    // J: or create list of functions to build up: find me evolution rules for stage

});
