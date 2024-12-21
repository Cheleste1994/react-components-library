export enum FontClassName {
  'heading-h1-medium',
  'heading-h2-medium',
  'heading-h3-medium',
  'heading-h4-medium',
  'heading-h5-medium',
  'heading-h6-medium',
  'body-text-medium',
  'body-text-regular',
  'captions-text-medium',
  'captions-text-regular',
  'captions-text-small-regular',
  'captions-text-small-medium',
  'buttons-text-small-medium',
  'buttons-text-normal-medium',
  'buttons-text-big-medium',
}

export type FontStyle = keyof typeof FontClassName;
