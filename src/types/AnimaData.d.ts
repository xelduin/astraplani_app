export type AnimaData = {
  id: number;
  name: String;
  owner: String;
  attributes: Attribute[];
};

export type AnimaAttribute = {
  name: String;
  base: number;
  level: number;
};
