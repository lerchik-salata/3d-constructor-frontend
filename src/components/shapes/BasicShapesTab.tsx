import React from "react";
import type { ShapeType } from "../../constants/shapes";
import type { BasicShapeDto } from "../../api/shapesApi";

interface Props {
  shapes: BasicShapeDto[];
  onCreate: (type: ShapeType) => void;
}

export const BasicShapesTab: React.FC<Props> = ({ shapes, onCreate }) => {
  return (
    <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shapes.map(shape => (
          <div key={shape.id} className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3 hover:bg-gray-800/70 transition">
            <div className="font-semibold text-lg">Type: {shape.type}</div>
            <button
              className="mt-auto bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-white text-sm font-medium"
              onClick={() => onCreate(shape.type as ShapeType)}
            >
              Create Shape
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
