import React, { useState } from 'react';

function ToggleButton() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id="toggleButton"
                className="hidden"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label
                htmlFor="toggleButton"
                className="flex items-center cursor-pointer"
            >
                <div className="w-12 h-6 bg-gray-400 rounded-full p-1">
                    <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                            isChecked ? 'translate-x-full' : ''
                        }`}
                    ></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">Toggle</div>
            </label>
        </div>
    );
}

export default ToggleButton;
