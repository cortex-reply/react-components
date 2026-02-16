
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
  onSave: (fieldName: string, value: string) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  fieldName,
  value,
  label,
  multiline = false,
  onSave,
  className = "",
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const handleFieldClick = () => {
    if (!disabled) {
      setIsEditing(true);
      setTempValue(value);
    }
  };

  const handleSave = async () => {
    if (tempValue !== value) {
      await onSave(fieldName, tempValue);
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
          className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} hover:bg-muted/50 p-2 rounded border border-transparent hover:border-border transition-colors group ${
            multiline ? "min-h-[100px] max-h-[300px]" : "min-h-[40px]"
          } flex items-start gap-2 overflow-hidden`}
        >
          <span className={`${multiline ? "text-sm text-muted-foreground max-h-[280px] overflow-y-auto break-words" : "text-lg font-medium text-foreground"} flex-1 whitespace-pre-wrap break-words`}>
            {value || "Click to edit..."}
          </span>
          {!disabled && (
            <Edit className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          )}
        </div>
      )}
    </div>
  );
};
