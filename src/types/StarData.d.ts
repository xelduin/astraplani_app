export type StarData = {
  id: number;
  position: Vector3;
  size: number;
  mana: StarMana[];
};

export type StarMana = {
  name: String;
  value: number;
};
