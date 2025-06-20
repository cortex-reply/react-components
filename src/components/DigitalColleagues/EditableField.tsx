
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

interface EditableFieldProps {
  fieldName: string;
  value: string;
  label: string;
  multiline?: boolean;
  onSave: (fieldName: string, value: string) => void;
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  fieldName,
  value,
  label,
  multiline = false,
  onSave,
  className = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const handleFieldClick = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleSave = () => {
    if (tempValue !== value) {
      onSave(fieldName, tempValue);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue('');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {isEditing ? (
        multiline ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            autoFocus
            rows={4}
            className="resize-none"
          />
        ) : (
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyPress={handleKeyPress}
            autoFocus
            className="text-lg font-medium"
          />
        )
      ) : (
        <div
          onClick={handleFieldClick}
          className={`cursor-pointer hover:bg-gray-50 p-2 rounded border border-transparent hover:border-gray-200 transition-colors group ${
            multiline ? "min-h-[100px]" : "min-h-[40px]"
          } flex items-start gap-2`}
        >
          <span className={multiline ? "text-sm text-gray-700" : "text-lg font-medium text-gray-900"}>
            {value || "Click to edit..."}
          </span>
          <Edit className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
};
