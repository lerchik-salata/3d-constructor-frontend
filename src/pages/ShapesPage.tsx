import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shapes } from "lucide-react";
import { ShapeModal } from "../components/shapes/ShapeModal";
import type { ShapeType } from "../constants/shapes";
import { ShapesApi, type CustomShapeDto, type BasicShapeDto } from "../api/shapesApi";
import { BasicShapesTab } from "../components/shapes/BasicShapesTab";
import { CustomShapesTab } from "../components/shapes/CustomShapesTab";

export const ShapesPage: React.FC = () => {
  const [modalShape, setModalShape] = useState<ShapeType | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "custom">("basic");

  const [basicShapes, setBasicShapes] = useState<BasicShapeDto[]>([]);
  const [customShapes, setCustomShapes] = useState<CustomShapeDto[]>([]);
  const [editingShapeId, setEditingShapeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const basics = await ShapesApi.getBasicShapes();
        const customs = await ShapesApi.getCustomShapes();
        setBasicShapes(basics);
        setCustomShapes(customs);
      } catch (err) {
        console.error("Failed to fetch shapes", err);
      }
    };
    fetchShapes();
  }, []);

  const handleSave = async (data: CustomShapeDto) => {
    try {
      if (editingShapeId) {
        const updated = await ShapesApi.updateCustomShape(editingShapeId, data);
        setCustomShapes(prev => prev.map(s => s.id === editingShapeId ? updated : s));
      } else {
        const created = await ShapesApi.createCustomShape(data);
        setCustomShapes(prev => [...prev, created]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save shape");
    } finally {
      setModalShape(null);
      setEditingShapeId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this shape?")) return;
    try {
      await ShapesApi.deleteCustomShape(id);
      setCustomShapes(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete shape");
    }
  };

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

      {activeTab === "basic" && (
        <BasicShapesTab shapes={basicShapes} onCreate={setModalShape} />
      )}

      {activeTab === "custom" && (
        <CustomShapesTab
          shapes={customShapes}
          onEdit={(id, type) => {
            setEditingShapeId(id);
            setModalShape(type as ShapeType);
          }}
          onDelete={handleDelete}
        />
      )}

      {modalShape && (
        <ShapeModal
          shapeType={modalShape}
          initialData={editingShapeId ? customShapes.find(s => s.id === editingShapeId) : undefined}
          onClose={() => {
            setModalShape(null);
            setEditingShapeId(null);
          }}
          onSave={handleSave}
        />
      )}
    </motion.div>
  );
};
