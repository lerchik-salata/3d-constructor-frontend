export const SHAPE_TYPES = ["sphere", "cylinder", "cone", "torus", "plane", "cube"] as const;
export type ShapeType = typeof SHAPE_TYPES[number];
