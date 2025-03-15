import {
  CreateAttackCategory as ICreateAttackCategory,
  CreateAttack as ICreateAttack,
  CreateAttackTechnique as ICreateAttackTechnique,
  CreateDefendCategory as ICreateDefendCategory,
  CreateDefendSubCategory as ICreateDefendSubCategory,
  CreateDefend as ICreateDefend,
  CreateDefendSub as ICreateDefendSub,
  FindAttackByName as IFindAttackByName,
} from "./scenario.interface";
import { IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator";

export class CreateAttackCategory implements ICreateAttackCategory {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateAttack implements ICreateAttack {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class CreateAttackTechnique implements ICreateAttackTechnique {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  attackId: string;
}

export class CreateDefendCategory implements ICreateDefendCategory {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateDefendSubCategory implements ICreateDefendSubCategory {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  relatedAttackIds: string[];

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class CreateDefend implements ICreateDefend {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  relatedAttackIds: string[];

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  subCategoryId: string;
}

export class CreateDefendSub implements ICreateDefendSub {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  relatedAttackIds: string[];

  @IsString()
  @IsNotEmpty()
  defendId: string;
}

export class FindAttackByName implements IFindAttackByName {
  @IsString()
  @IsNotEmpty()
  name: string;
}
