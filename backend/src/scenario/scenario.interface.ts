export interface CreateAttackCategory {
  id: string;
  name: string;
  url: string;
}

export interface CreateAttack {
  id: string;
  name: string;
  url: string;
  categoryId: string;
}

export interface CreateAttackTechnique {
  id: string;
  name: string;
  url: string;
  attackId: string;
}

export interface CreateDefendCategory {
  id: string;
  name: string;
  url: string;
}

export interface CreateDefendSubCategory {
  id: string;
  name: string;
  url: string;
  categoryId: string;
}

export interface CreateDefend {
  id: string;
  name: string;
  url: string;
  subCategoryId: string;
}

export interface CreateDefendSub {
  id: string;
  name: string;
  url: string;
  defendId: string;
}

export interface FindAttackByName {
  name: string;
}
