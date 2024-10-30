// src/components/LevelSelection.js
import React from 'react';

const LevelSelection = ({ levels, onLevelSelect }) => (
    <div>
        <h2>Select Level</h2>
        <select onChange={(e) => onLevelSelect(e.target.value)}>
            <option value="">--Choose Level--</option>
            {levels.map((level) => (
                <option key={level} value={level}>
                    {level}
                </option>
            ))}
        </select>
    </div>
);

export default LevelSelection;
