import { Module } from "@nestjs/common";
import { ScenarioService } from "./scenario.service";
import { ScenarioController } from "./scenario.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AttackCategoryEntity,
  AttackEntity,
  DefendCategoryEntity,
  DefendEntity,
  DefendSubCategoryEntity,
  AttackTechniqueEntity,
  SubDefendEntity,
} from "./scenario.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttackCategoryEntity,
      AttackEntity,
      AttackTechniqueEntity,
      DefendCategoryEntity,
      DefendSubCategoryEntity,
      DefendEntity,
      SubDefendEntity,
    ]),
  ],
  providers: [ScenarioService],
  controllers: [ScenarioController],
})
export class ScenarioModule {}
