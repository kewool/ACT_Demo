import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ScenarioService } from "./scenario.service";
import {
  CreateAttack,
  CreateAttackCategory,
  CreateDefend,
  CreateDefendCategory,
  CreateDefendSub,
  CreateDefendSubCategory,
  CreateAttackTechnique,
  FindAttackByName,
} from "./scenario.dto";

@Controller("scenario")
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Get("attacks")
  async getAttacks() {
    return this.scenarioService.getAttacks();
  }

  @Post("attack_category")
  async createAttackCategory(@Body() payload: CreateAttackCategory) {
    return this.scenarioService.createAttackCategory(payload);
  }

  @Post("attack")
  async createAttack(@Body() payload: CreateAttack) {
    return this.scenarioService.createAttack(payload);
  }

  @Post("attack_technique")
  async createAttackTechnique(@Body() payload: CreateAttackTechnique) {
    return this.scenarioService.createAttackTechnique(payload);
  }

  @Delete("attack_category/:id")
  async deleteAttackCategory(@Param("id") id: string) {
    return this.scenarioService.deleteAttackCategory(id);
  }

  @Get("defends")
  async getDefends() {
    return this.scenarioService.getDefends();
  }

  @Post("defend_category")
  async createDefendCategory(@Body() payload: CreateDefendCategory) {
    return this.scenarioService.createDefendCategory(payload);
  }

  @Post("defend_sub_category")
  async createDefendSubCategory(@Body() payload: CreateDefendSubCategory) {
    return this.scenarioService.createDefendSubCategory(payload);
  }

  @Post("defend")
  async createDefend(@Body() payload: CreateDefend) {
    return this.scenarioService.createDefend(payload);
  }

  @Post("sub_defend")
  async createSubDefend(@Body() payload: CreateDefendSub) {
    return this.scenarioService.createSubDefend(payload);
  }

  @Post("sub_defend_child")
  async createSubDefendChild(@Body() payload: CreateDefendSub) {
    return this.scenarioService.createSubDefendChild(payload);
  }

  @Delete("all")
  async deleteAll() {
    return this.scenarioService.deleteAll();
  }

  @Delete("all/defend")
  async deleteAllDefend() {
    return this.scenarioService.deleteDefends();
  }

  @Post("find/attack_category")
  async findAttackCategory(@Body() payload: FindAttackByName) {
    return this.scenarioService.getAttackCategoryIdByName(payload.name);
  }

  @Post("find/attack")
  async findAttack(@Body() payload: FindAttackByName) {
    return this.scenarioService.getAttackIdByName(payload.name);
  }

  @Post("find/attack_technique")
  async findAttackTechnique(@Body() payload: FindAttackByName) {
    return this.scenarioService.getAttackTechniqueIdByName(payload.name);
  }
}
