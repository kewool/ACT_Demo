import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  AttackCategoryEntity,
  AttackEntity,
  DefendCategoryEntity,
  DefendEntity,
  DefendSubCategoryEntity,
  AttackTechniqueEntity,
  SubDefendEntity,
} from "./scenario.entity";
import { Repository } from "typeorm";
import {
  CreateAttackCategory,
  CreateAttack,
  CreateAttackTechnique,
  CreateDefendCategory,
  CreateDefendSubCategory,
  CreateDefend,
  CreateDefendSub,
} from "./scenario.interface";

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(AttackCategoryEntity)
    private readonly attackCategoryRepository: Repository<AttackCategoryEntity>,
    @InjectRepository(AttackEntity)
    private readonly attackRepository: Repository<AttackEntity>,
    @InjectRepository(AttackTechniqueEntity)
    private readonly attackTechniqueRepository: Repository<AttackTechniqueEntity>,
    @InjectRepository(DefendCategoryEntity)
    private readonly defendCategoryRepository: Repository<DefendCategoryEntity>,
    @InjectRepository(DefendSubCategoryEntity)
    private readonly defendSubCategoryRepository: Repository<DefendSubCategoryEntity>,
    @InjectRepository(DefendEntity)
    private readonly defendRepository: Repository<DefendEntity>,
    @InjectRepository(SubDefendEntity)
    private readonly subDefendRepository: Repository<SubDefendEntity>,
  ) {}

  async getAttacks() {
    const categories = await this.attackCategoryRepository.find({
      relations: ["attacks", "attacks.techniques"],
    });
    categories.forEach((category) => {
      category.attacks.sort((a, b) => a.name.localeCompare(b.name));
      category.attacks.forEach((attack) => {
        attack.techniques.sort((a, b) => a.name.localeCompare(b.name));
      });
    });
    return categories;
  }

  async createAttackCategory(payload: CreateAttackCategory) {
    return this.attackCategoryRepository.save(payload);
  }

  async createAttack(payload: CreateAttack) {
    const category = await this.attackCategoryRepository.findOne({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const attack = this.attackRepository.create(payload);
    attack.category = category;
    return this.attackRepository.save(attack);
  }

  async createAttackTechnique(payload: CreateAttackTechnique) {
    const attack = await this.attackRepository.findOne({
      where: { id: payload.attackId },
    });
    if (!attack) {
      throw new Error("Attack not found");
    }
    const attackTechnique = this.attackTechniqueRepository.create(payload);
    attackTechnique.attack = attack;
    return this.attackTechniqueRepository.save(attackTechnique);
  }

  async getDefends() {
    const defends = await this.defendCategoryRepository.find({
      relations: [
        "subCategories",
        "subCategories.defends",
        "subCategories.defends.subDefends",
        "subCategories.defends.subDefends.children",
      ],
    });

    const order = [
      "Model",
      "Harden",
      "Detect",
      "Isolate",
      "Deceive",
      "Evict",
      "Restore",
    ];
    defends.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    defends.forEach((category) => {
      category.subCategories.sort((a, b) => a.name.localeCompare(b.name));
      category.subCategories.forEach((subCategory) => {
        subCategory.defends.sort((a, b) => a.name.localeCompare(b.name));
        subCategory.defends.forEach((defend) => {
          defend.subDefends.sort((a, b) => a.name.localeCompare(b.name));
          defend.subDefends.forEach((subDefend) => {
            subDefend.children.sort((a, b) => a.name.localeCompare(b.name));
          });
        });
      });
    });

    return defends;
  }

  async createDefendCategory(payload: CreateDefendCategory) {
    return this.defendCategoryRepository.save(payload);
  }

  async createDefendSubCategory(payload: CreateDefendSubCategory) {
    const category = await this.defendCategoryRepository.findOne({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const subCategory = this.defendSubCategoryRepository.create(payload);
    subCategory.category = category;
    return this.defendSubCategoryRepository.save(subCategory);
  }

  async createDefend(payload: CreateDefend) {
    const subCategory = await this.defendSubCategoryRepository.findOne({
      where: { id: payload.subCategoryId },
    });
    if (!subCategory) {
      throw new Error("Sub Category not found");
    }
    const defend = this.defendRepository.create(payload);
    defend.subCategory = subCategory;
    return this.defendRepository.save(defend);
  }

  async createSubDefend(payload: CreateDefendSub) {
    const defend = await this.defendRepository.findOne({
      where: { id: payload.defendId },
    });
    if (!defend) {
      throw new Error("Defend not found");
    }
    const subDefend = this.subDefendRepository.create(payload);
    subDefend.defend = defend;
    return this.subDefendRepository.save(subDefend);
  }

  async createSubDefendChild(payload: CreateDefendSub) {
    const subDefend = await this.subDefendRepository.findOne({
      where: { id: payload.defendId },
    });

    if (!subDefend) {
      throw new Error("Sub Defend not found");
    }

    const subDefendChild = this.subDefendRepository.create(payload);
    subDefendChild.parent = subDefend;
    return this.subDefendRepository.save(subDefendChild);
  }

  async deleteAttackCategory(id: string) {
    return this.attackCategoryRepository.delete(id);
  }

  async deleteDefendCategory(id: string) {
    return this.defendCategoryRepository.delete(id);
  }

  async deleteDefends() {
    await this.defendCategoryRepository.delete({});
    await this.defendSubCategoryRepository.delete({});
    await this.defendRepository.delete({});
    await this.subDefendRepository.delete({});
  }

  async deleteAll() {
    await this.attackCategoryRepository.delete({});
    await this.defendCategoryRepository.delete({});
    await this.attackRepository.delete({});
    await this.attackTechniqueRepository.delete({});
    await this.defendSubCategoryRepository.delete({});
    await this.defendRepository.delete({});
    await this.subDefendRepository.delete({});
  }

  async getAttackCategoryIdByName(name: string) {
    const category = await this.attackCategoryRepository
      .createQueryBuilder("category")
      .where("LOWER(category.name) = LOWER(:name)", { name })
      .getOne();
    return category?.id;
  }

  async getAttackIdByName(name: string) {
    const attack = await this.attackRepository
      .createQueryBuilder("attack")
      .where("LOWER(attack.name) = LOWER(:name)", { name })
      .getOne();
    return attack?.id;
  }

  async getAttackTechniqueIdByName(name: string) {
    const technique = await this.attackTechniqueRepository
      .createQueryBuilder("technique")
      .where("LOWER(technique.name) = LOWER(:name)", { name })
      .getOne();
    return technique?.id;
  }
}
