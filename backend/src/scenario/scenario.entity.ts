import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import {
  CREATE_DATE_COLUMN_OPTIONS,
  UPDATE_DATE_COLUMN_OPTIONS,
  DELETE_DATE_COLUMN_OPTIONS,
} from "../constants/column_options";

@Entity("attack_categories")
export class AttackCategoryEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @OneToMany(() => AttackEntity, (attack) => attack.category)
  attacks: AttackEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("attacks")
export class AttackEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => AttackCategoryEntity, (category) => category.attacks, {
    onDelete: "CASCADE",
  })
  category: AttackCategoryEntity;

  @OneToMany(() => AttackTechniqueEntity, (technique) => technique.attack)
  techniques: AttackTechniqueEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("attack_techniques")
export class AttackTechniqueEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => AttackEntity, (attack) => attack.techniques, {
    onDelete: "CASCADE",
  })
  attack: AttackEntity;

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("defend_categories")
export class DefendCategoryEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @OneToMany(
    () => DefendSubCategoryEntity,
    (subCategory) => subCategory.category,
  )
  subCategories: DefendSubCategoryEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("defend_sub_categories")
export class DefendSubCategoryEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "varchar", length: 16, array: true, nullable: true })
  relatedAttackIds: string[];

  @ManyToOne(() => DefendCategoryEntity, (category) => category.subCategories, {
    onDelete: "CASCADE",
  })
  category: DefendCategoryEntity;

  @OneToMany(() => DefendEntity, (defend) => defend.subCategory)
  defends: DefendEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("defends")
export class DefendEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "varchar", length: 16, array: true, nullable: true })
  relatedAttackIds: string[];

  @ManyToOne(
    () => DefendSubCategoryEntity,
    (subCategory) => subCategory.defends,
    { onDelete: "CASCADE" },
  )
  subCategory: DefendSubCategoryEntity;

  @OneToMany(() => SubDefendEntity, (subDefend) => subDefend.defend)
  subDefends: SubDefendEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}

@Entity("sub_defends")
export class SubDefendEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "varchar", length: 16, array: true, nullable: true })
  relatedAttackIds: string[];

  @ManyToOne(() => DefendEntity, (defend) => defend.subDefends, {
    onDelete: "CASCADE",
  })
  defend: DefendEntity;

  @ManyToOne(() => SubDefendEntity, (subDefend) => subDefend.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent: SubDefendEntity;

  @OneToMany(() => SubDefendEntity, (subDefend) => subDefend.parent)
  children: SubDefendEntity[];

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  createdAt: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  updatedAt: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  deletedAt: Date;
}
