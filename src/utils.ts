export const formatAddress = (address) => {
  return `${address?.slice(0, 6)}...${address?.slice(-3)}`;
};

import { Color, Vector3 } from 'three';
import anima_attributes from './data/mock_anima_metadata.json';
import mock_stars from './data/mock_stars.json';
import { AnimaData } from './types/AnimaData';
import { StarData } from './types/StarData';

export function getColor(entity) {
  if (entity.attributes === undefined) return;
  const attributes = entity.attributes.toSpliced(0, 6).map((e) => {
    const attr = {};
    attr[e.name] = e.value;
    return attr;
  });
  const elementData = Object.assign({}, ...attributes);
  const h =
    (elementData.fire * (elementData.water > elementData.earth ? 360 : 0) +
      elementData.water * 240 +
      elementData.earth * 120) /
    (elementData.fire + elementData.water + elementData.earth);
  const s = Math.round(
    (elementData.fire +
      elementData.water +
      elementData.earth +
      elementData.light +
      elementData.dark +
      elementData.air) /
      6
  );
  const v = 80; //Math.round((elementData.light - elementData.dark + 100) / 2);
  const l = v * (100 - s / 2);
  return new Color(`hsl(${h}, ${s}%, ${v}%)`);
}

export function getAnimaData() {
  const anima: AnimaData[] = [];
  const owner =
    Math.random() < 0.9
      ? Math.random().toString()
      : '0x1e53e615d0ffa424ab4c5076021667454364d8626704127ae987b2c93ea7df8';

  anima_attributes.forEach(({ id, attributes, name }) => {
    anima.push({
      id,
      name,
      owner,
      attributes: attributes.map((e) => {
        return {
          name: Object.keys(e)[0],
          value: Object.values(e)[0],
          level: 1,
        };
      }),
    });
  });

  return anima;
}

export function generateMockStars() {
  const stars: StarData[] = [];

  mock_stars.forEach(({ id, coords }) => {
    if (id > 100) return;

    const position = new Vector3(
      Number(coords.x) - 50,
      Number(coords.y) - 50,
      1
    );

    const size = Math.random() > 0.9 ? Math.random() * 5 : Math.random() * 2;

    stars.push({
      id,
      position,
      size,
      mana: [
        { name: 'fire', value: 0 },
        { name: 'water', value: 0 },
        { name: 'earth', value: 0 },
        { name: 'air', value: 0 },
      ],
    });
  });

  return stars;
}
