import React from "react";

interface CheckboxProps {
  isSelected: boolean;
  setIsSelected: (selected: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ isSelected, setIsSelected, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => setIsSelected(e.target.checked)}
        className="form-checkbox size-5 text-blue-600"
      />
    </div>
  );
};

export default Checkbox;
