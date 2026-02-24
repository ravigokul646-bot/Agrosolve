import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface ImageUploaderProps {
  onImageSelect: (base64: string | null) => void;
  selectedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-olive-200 group">
          <img src={selectedImage} alt="Selected crop" className="w-full h-48 object-cover" />
          <button 
            onClick={() => onImageSelect(null)}
            className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-2 text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
            Image ready for analysis
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
            isDragging ? "border-olive-600 bg-olive-100" : "border-olive-200 bg-white hover:border-olive-400 hover:bg-olive-50"
          )}
        >
          <div className="bg-olive-100 p-3 rounded-full text-olive-600">
            <Camera size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-olive-900">Upload crop photo</p>
            <p className="text-xs text-olive-500">Drag & drop or click to browse</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
};
