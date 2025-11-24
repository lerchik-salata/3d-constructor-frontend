export const SHAPE_TYPES = ["box", "sphere", "cylinder", "cone", "torus", "plane"] as const;
export type ShapeType = typeof SHAPE_TYPES[number];
