import React, { useRef } from 'react';

interface MultiImageUploaderProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
    images,
    onImagesChange,
    maxImages = 5
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const remainingSlots = maxImages - images.length;
            const filesToProcess = files.slice(0, remainingSlots);

            filesToProcess.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        onImagesChange([...images, reader.result as string]);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        // Reset input so same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    return (
        <div className="w-full mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
                Reference Images (Max {maxImages})
            </label>

            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-600 group">
                        <img src={img} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full"
                                title="Remove image"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                            Image {index + 1}
                        </div>
                    </div>
                ))}

                {images.length < maxImages && (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-400 transition-all flex flex-col items-center justify-center text-slate-400 hover:text-slate-200"
                    >
                        <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs">Add Image</span>
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />

            <p className="text-xs text-slate-500">
                Upload up to {maxImages} images to reference in your prompt.
            </p>
        </div>
    );
};
