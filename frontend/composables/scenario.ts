import type { AttackCategory, DefendCategory } from "~/interfaces/scenario";

export const getAttacks = async () => {
  try {
    const { data } = await getAPI<AttackCategory[]>("/scenario/attacks");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getDefends = async () => {
  try {
    const { data } = await getAPI<DefendCategory[]>("/scenario/defends");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}