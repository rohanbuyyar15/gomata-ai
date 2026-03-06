import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, isUploading }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: isUploading
  } as any);

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-8 transition-all duration-300 cursor-pointer overflow-hidden",
          isDragActive ? "border-emerald-500 bg-emerald-50/50" : "border-stone-300 hover:border-emerald-400 bg-white/50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              {!isUploading && (
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-800 hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p className="font-medium">Analyzing Breed...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-stone-500"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Upload Cattle Image</h3>
              <p className="text-center max-w-xs">
                Drag and drop or click to select a clear photo of your cow or buffalo
              </p>
              <div className="mt-6 flex gap-4 text-xs font-medium uppercase tracking-wider text-stone-400">
                <span>JPG</span>
                <span>•</span>
                <span>PNG</span>
                <span>•</span>
                <span>MAX 5MB</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
