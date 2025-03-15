export interface AttackCategory {
  id: string;
  name: string;
  url: string;
  attacks: Attack[];
  createdAt: string;
}
export interface Attack {
  id: string;
  name: string;
  url: string;
  techniques: AttackTechnique[];
  createdAt: string;
}
export interface AttackTechnique {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

export interface DefendCategory {
  id: string;
  name: string;
  url: string;
  subCategories: DefendSubCategory[];
  createdAt: string;
}

export interface DefendSubCategory {
  id: string;
  name: string;
  url: string;
  relatedAttackIds: string[];
  defends: Defend[];
  createdAt: string;
}

export interface Defend {
  id: string;
  name: string;
  url: string;
  relatedAttackIds: string[];
  subDefends: SubDefend[];
  createdAt: string;
}

export interface SubDefend {
  id: string;
  name: string;
  url: string;
  relatedAttackIds: string[];
  children: SubDefend[];
  createdAt: string;
}
