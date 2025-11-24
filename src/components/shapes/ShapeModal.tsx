import React, { useState } from "react";
import { X } from "lucide-react";
import { ShapePreviewCanvas } from "./ShapePreviewCanvas";
import type { ShapeType } from "../../constants/shapes";

interface ShapeModalProps {
  shapeType: ShapeType;
  onClose: () => void;
  onSave: (params: any) => void;
  initialData?: {
    name: string;
    color: string;
    params: any;
  };
}

export const ShapeModal: React.FC<ShapeModalProps> = ({
  shapeType,
  onClose,
  onSave,
  initialData, 
}) => {

  const [name, setName] = useState(initialData?.name || "");
  const [color, setColor] = useState(initialData?.color || "#3399ff");

  const [params, setParams] = useState(() => {
    switch (shapeType) {
      case "cube": return initialData?.params || { width: 1, height: 1, depth: 1 };
      case "sphere": return initialData?.params || { radius: 1 };
      case "cylinder": return initialData?.params || { radius: 1, height: 2 };
      case "cone": return initialData?.params || { radius: 1, height: 2 };
      case "torus": return initialData?.params || { radius: 1, tube: 0.4 };
      case "plane": return initialData?.params || { width: 2, height: 2 };
      default: return {};
    }
  });

  const update = (key: string, value: number) => {
    setParams((prev : Record<string, any>) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    onSave({ name, color, type: shapeType, params });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-[900px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold capitalize">{shapeType} settings</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-300 hover:text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2">

          <div className="bg-black">
            <ShapePreviewCanvas type={shapeType} params={params} color={color} />
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div>
              <label className="text-gray-300">Name</label>
              <input
                className="w-full mt-1 text-gray-300 bg-gray-800 border border-gray-700 rounded p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300">Color</label>
              <input
                type="color"
                className="w-full mt-1 h-10 p-0 border-none"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            {Object.keys(params).map((key) => (
              <div key={key}>
                <label className="text-gray-300 capitalize">{key}</label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={params[key]}
                  onChange={(e) => update(key, parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
                <div className="text-gray-400 text-sm">{params[key]}</div>
              </div>
            ))}

            <button
              className="mt-auto bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-medium"
              onClick={handleSave}
            >
              {initialData ? "Update Shape" : "Create Shape"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
