'use client';

export function DropZone() {
  return (
    <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-300 flex items-center justify-center">
      <div className="text-blue-600 text-center">
        <div className="text-2xl mb-2">📦</div>
        <p className="font-medium">Drop component here</p>
      </div>
    </div>
  );
}