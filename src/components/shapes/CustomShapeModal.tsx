import React, { useState } from "react";
import { X } from "lucide-react";
import { CustomShapePreviewCanvas } from "./CustomShapePreviewCanvas";

interface CustomShapeModalProps {
  onClose: () => void;
  onSave: (data: { vertices: number[]; indices: number[] }) => void;
}

export const CustomShapeModal: React.FC<CustomShapeModalProps> = ({ onClose, onSave }) => {
  const [verticesText, setVerticesText] = useState("0,0,0\n1,0,0\n0,1,0");
  const [indicesText, setIndicesText] = useState("0,1,2");

  const parseVertices = () =>
    verticesText
      .split("\n")
      .map((line) => line.split(",").map((v) => parseFloat(v)))
      .flat();

  const parseIndices = () =>
    indicesText
      .split("\n")
      .map((line) => line.split(",").map((v) => parseInt(v, 10)))
      .flat();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-[900px] max-h-[90vh] overflow-auto shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Custom Shape Editor</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-300 hover:text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6">
          {/* LEFT: CANVAS */}
          <div className="bg-black h-[400px]">
            <CustomShapePreviewCanvas vertices={parseVertices()} indices={parseIndices()} />
          </div>

          {/* RIGHT: INPUTS */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-300">Vertices (x,y,z per line)</label>
              <textarea
                className="w-full h-32 mt-1 text-gray-300 bg-gray-800 border border-gray-700 rounded p-2"
                value={verticesText}
                onChange={(e) => setVerticesText(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300">Indices (per line, 3 per triangle)</label>
              <textarea
                className="w-full h-24 mt-1 text-gray-300 bg-gray-800 border border-gray-700 rounded p-2"
                value={indicesText}
                onChange={(e) => setIndicesText(e.target.value)}
              />
            </div>

            <button
              className="mt-auto bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-medium"
              onClick={() => onSave({ vertices: parseVertices(), indices: parseIndices() })}
            >
              Save Custom Shape
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
