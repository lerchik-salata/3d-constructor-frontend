import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type {  } from '../../types/scene';
import type { ProjectSettings } from '../../types/project';

interface SceneSettingsPanelProps {
  settings: ProjectSettings;
  onChange: (newSettings: ProjectSettings) => void;
  onSave: (newSettings: ProjectSettings) => void;
}

const SceneSettingsPanel: React.FC<SceneSettingsPanelProps> = ({ settings, onChange, onSave }) => {
  const [collapsed, setCollapsed] = useState(false);

  const updateSetting = <K extends keyof ProjectSettings>(key: K, value: ProjectSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="controls-panel bg-gray-800 text-white shadow-xl rounded-2xl p-5 w-full md:w-80 space-y-6 fixed top-20 left-4 z-50 max-h-180 overflow-y-auto">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        <h2 className="text-2xl font-bold border-b pb-2 flex-1">Project Settings</h2>
        {collapsed ? <ChevronDown className="w-5 h-5 text-gray-300" /> : <ChevronUp className="w-5 h-5 text-gray-300" />}
      </div>

      {!collapsed && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Environment Preset</h3>
            <select
              value={settings.preset ?? ''}
              onChange={(e) => updateSetting('preset', (e.target.value || null) as ProjectSettings['preset'])}
              className="w-full h-10 mt-1 rounded-xl border-2 border-indigo-400"
            >
              <option value="">No preset</option>
              <option value="city">City</option>
              <option value="sunset">Sunset</option>
              <option value="forest">Forest</option>
            </select>
          </div>

          <div>
            <label className="flex flex-col">
              Preset Blur: {settings.presetBlur.toFixed(2)}
              <input
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={settings.presetBlur}
                onChange={(e) => updateSetting('presetBlur', parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col">
              Background Color
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                className="w-full h-10 mt-1 rounded-xl border-2 border-indigo-400"
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col">
              Scene Color
              <input
                type="color"
                value={settings.sceneColor}
                onChange={(e) => updateSetting('sceneColor', e.target.value)}
                className="w-full h-10 mt-1 rounded-xl border-2 border-indigo-400"
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col">
              Ambient Light Intensity: {settings.lightIntensity.toFixed(2)}
              <input
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={settings.lightIntensity}
                onChange={(e) => updateSetting('lightIntensity', parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </label>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Directional Light Position</h3>
            {['X', 'Y', 'Z'].map((axis, i) => (
              <input
                key={axis}
                type="number"
                value={settings.directionalLightPosition[i]}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  const newPos = [...settings.directionalLightPosition];
                  newPos[i] = v;
                  updateSetting('directionalLightPosition', newPos as [number, number, number]);
                }}
                className="w-full px-2 py-1 rounded-xl border-2 border-indigo-400"
              />
            ))}
          </div>

          <button
            onClick={() => onSave(settings)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl mt-4"
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default SceneSettingsPanel;
