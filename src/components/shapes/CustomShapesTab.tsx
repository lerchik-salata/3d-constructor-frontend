import React from "react";
import type { CustomShapeDto } from "../../api/shapesApi";

interface Props {
  shapes: CustomShapeDto[];
  onEdit: (id: number, type: string) => void;
  onDelete: (id: number) => void;
}

export const CustomShapesTab: React.FC<Props> = ({ shapes, onEdit, onDelete }) => {
  if (shapes.length === 0) {
    return <div className="text-gray-500 text-center py-10">No custom shapes yet...</div>;
  }

  return (
    <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shapes.map(shape => (
          <div key={shape.id} className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-2">
            <div className="font-semibold text-lg">{shape.name}</div>
            <div className="text-gray-400 text-sm">Type: {shape.type}</div>
            <div className="w-full h-16 rounded" style={{ backgroundColor: shape.color }} />
            <div className="flex gap-2 mt-auto">
              <button
                className="bg-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded-lg text-white text-sm"
                onClick={() => onEdit(shape.id!, shape.type)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-white text-sm"
                onClick={() => onDelete(shape.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
