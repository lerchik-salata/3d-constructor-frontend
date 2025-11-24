import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shapes } from "lucide-react";
import { ShapeModal } from "../components/shapes/ShapeModal";
import type { ShapeType } from '../constants/shapes';

export const ShapesPage: React.FC = () => {
    const [modalShape, setModalShape] = useState<ShapeType | null>(null);

    const basicShapes: { id: number; name: string; type: ShapeType }[] = [
    { id: 1, name: "Cube", type: "box" },
    { id: 2, name: "Sphere", type: "sphere" },
    { id: 3, name: "Cylinder", type: "cylinder" },
    { id: 4, name: "Cone", type: "cone" },
    { id: 5, name: "Torus", type: "torus" },
    { id: 6, name: "Plane", type: "plane" },
    ];
    
    const [activeTab, setActiveTab] = useState<"basic" | "custom">("basic");

    const [customShapes, setCustomShapes] = useState<
    { id: number; name: string; color: string; type: ShapeType; params: any }[]
    >([]);

    const [editingShapeId, setEditingShapeId] = useState<number | null>(null);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <section className="border-b border-gray-700 pb-3 flex gap-4">
        <button
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === "basic" ? "bg-blue-600 text-white" : "bg-gray-800/40 text-gray-400 hover:bg-gray-700/40 hover:text-white"
            }`}
        >
            <Shapes size={18} /> Basic Shapes
        </button>

        <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === "custom" ? "bg-blue-600 text-white" : "bg-gray-800/40 text-gray-400 hover:bg-gray-700/40 hover:text-white"
            }`}
        >
            <Shapes size={18} /> Custom Shapes
        </button>
    </section>


    {activeTab === "basic" &&
      <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Shapes size={24} className="text-blue-400" />
          Basic Shapes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {basicShapes.map((shape) => (
            <div
              key={shape.id}
              className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3 hover:bg-gray-800/70 transition"
            >
              <div className="font-semibold text-lg">{shape.name}</div>
              <div className="text-gray-400 text-sm">Type: {shape.type}</div>

              <button
                className="mt-auto bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-white text-sm font-medium"
                onClick={() => setModalShape(shape.type as any)}
              >
                Create Shape
              </button>
            </div>
          ))}
        </div>
      </section>
    }

    {activeTab === "custom" && (
  <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Shapes size={24} className="text-blue-400" /> Custom Shapes
      </h2>
    </div>

    {customShapes.length === 0 ? (
      <div className="text-gray-500 text-center py-10">No custom shapes yet...</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customShapes.map((shape) => (
          <div
            key={shape.id}
            className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="font-semibold text-lg">{shape.name}</div>
            <div className="text-gray-400 text-sm">Type: {shape.type}</div>
            <div
              className="w-full h-16 rounded"
              style={{ backgroundColor: shape.color }}
            />

            <div className="flex gap-2 mt-auto">
              <button
                className="bg-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded-lg text-white text-sm"
                onClick={() => {
                  setModalShape(shape.type as any);
                  setEditingShapeId(shape.id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-white text-sm"
                onClick={() =>
                  setCustomShapes((prev) => prev.filter((s) => s.id !== shape.id))
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
)}

{modalShape && (
  <ShapeModal
    shapeType={modalShape}
    initialData={editingShapeId ? customShapes.find(s => s.id === editingShapeId) : undefined}
    onClose={() => setModalShape(null)}
    onSave={(data) => {
      if (editingShapeId) {
        setCustomShapes((prev) =>
          prev.map((s) => (s.id === editingShapeId ? { ...s, ...data } : s))
        );
      } else {
        setCustomShapes((prev) => [
          ...prev,
          { id: Date.now(), ...data },
        ]);
      }
      setModalShape(null);
      setEditingShapeId(null);
    }}
  />
)}
    </motion.div>
  );
};
