import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Texture } from '../../types/texture';
import type { ShapeType } from '../../constants/shapes';
import type { BasicShapeDto } from '../../api/shapesApi';
import type { CustomShapeDto } from '../../api/shapesApi';

interface SceneControlsPanelProps {
  sceneName: string;
  setSceneName: (name: string) => void;
  basicShapes: BasicShapeDto[];
  customShapes: CustomShapeDto[];
  addObject: (type: ShapeType, params: Record<string, number>, color?: string) => void;
  removeObject?: (id: number) => void;
  copyObject?: (id: number) => void;
  mode: 'translate' | 'rotate' | 'scale';
  setMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  saveScene: () => Promise<void>;
  selectedObjectId: number | null;
  changeObjectColor: (id: number, color: string) => void;
  changeColor: (id: number, color: string) => void;
  selectedObjectColor: string;
  textures: Texture[];
  changeObjectTexture: (id: number, textureId: number | null) => void;
  selectedObjectTexture: number | null;
}

const SceneControlsPanel: React.FC<SceneControlsPanelProps> = ({
  sceneName,
  setSceneName,
  addObject,
  basicShapes,
  customShapes,
  removeObject,
  copyObject,
  mode,
  setMode,
  saveScene,
  selectedObjectId,
  changeObjectColor,
  changeColor,
  selectedObjectColor,
  textures,
  changeObjectTexture,
  selectedObjectTexture,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="controls-panel bg-gray-50 text-white shadow-xl rounded-2xl p-5 w-full md:w-80 space-y-6 max-h-180 overflow-y-auto">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        <h2 className="text-2xl font-bold border-b pb-2 flex-1">Scene Constructor</h2>
        {collapsed ? <ChevronDown className="w-5 h-5 text-gray-300" /> : <ChevronUp className="w-5 h-5 text-gray-300" />}
      </div>

      {!collapsed && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Add Object</h3>
            <div className="flex gap-3 flex-wrap">
              {basicShapes.map(shape => (
                <button
                  key={shape.id}
                  onClick={() => addObject(shape.type as ShapeType, shape.params)}
                  className="py-2 px-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:scale-105 transform transition"
                >
                  {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Custom Shapes</h3>
            <div className="flex gap-3 flex-wrap">
              {customShapes.map(shape => (
                <button
                  key={shape.id}
                  onClick={() => addObject(shape.type as ShapeType, shape.params, shape?.color)}
                  className="py-2 px-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:scale-105 transform transition"
                >
                  {shape.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tool</h3>
            <div className="flex gap-3">
              {['translate', 'rotate', 'scale'].map(tool => (
                <button
                  key={tool}
                  onClick={() => setMode(tool as 'translate' | 'rotate' | 'scale')}
                  disabled={mode === tool}
                  className={`flex-1 py-2 px-3 rounded-xl font-medium transition 
                    ${mode === tool
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:bg-gradient-to-l'}
                  `}
                >
                  {tool.charAt(0).toUpperCase() + tool.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Copy/Remove Object</h3>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (selectedObjectId !== null) removeObject?.(selectedObjectId);
                }}
                className="w-full py-2 bg-red-500 text-white font-semibold rounded-xl hover:scale-105 transform transition"
              >
                Remove
              </button>

              <button
                onClick={() => {
                  if (selectedObjectId !== null) copyObject?.(selectedObjectId);
                }}
                className="w-full py-2 bg-green-500 text-white font-semibold rounded-xl hover:scale-105 transform transition"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Color</h3>
              <input
                type="color"
                value={selectedObjectColor}
                onMouseUp={e => {
                  if (selectedObjectId !== null) changeObjectColor(selectedObjectId, e.currentTarget.value);
                }}
                  onChange={e => {
                    if (selectedObjectId !== null) {
                      changeColor(selectedObjectId, e.target.value);
                    }
                  }}
                disabled={selectedObjectId === null}
                className={`w-full h-10 rounded-xl border-2 ${
                  selectedObjectId === null ? 'cursor-not-allowed opacity-50 border-gray-300' : 'cursor-pointer border-indigo-400'
                }`}
              />
            {selectedObjectId === null && (
              <p className="text-xs mt-1">Select an object to edit its properties.</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Texture</h3>

            <select
              value={selectedObjectTexture ?? ''}
              disabled={selectedObjectId === null}
              onChange={(e) => {
                if (selectedObjectId !== null) {
                  const value = e.target.value ? Number(e.target.value) : null;
                  changeObjectTexture(selectedObjectId, value);
                }
              }}
              className="w-full px-2 py-2 rounded-xl text-white border border-gray-400"
            >
              <option value="">No texture</option>

              {textures.map(tex => (
                <option key={tex.id} value={tex.id}>
                  {tex.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Save Scene</h3>
            <input
              type="text"
              value={sceneName}
              onChange={e => setSceneName(e.target.value)}
              placeholder="Scene Name"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
            />
            <button
              onClick={saveScene}
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transform transition"
            >
              Save Scene
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneControlsPanel;
