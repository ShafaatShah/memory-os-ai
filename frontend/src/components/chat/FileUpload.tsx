"use client";

import { useRef, useState } from "react";
import { Upload, FileText, Image, File, X } from "lucide-react";

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
}

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image")) {
      return <Image className="h-5 w-5 text-blue-400" />;
    }

    if (
      type.includes("pdf") ||
      type.includes("text") ||
      type.includes("word")
    ) {
      return <FileText className="h-5 w-5 text-emerald-400" />;
    }

    return <File className="h-5 w-5 text-slate-400" />;
  };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) {
      return;
    }

    const uploadedFiles: UploadedFile[] = Array.from(selectedFiles).map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: file.type,
      })
    );

    setFiles((previousFiles) => [...previousFiles, ...uploadedFiles]);
  };

  const removeFile = (id: number) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => file.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 p-8 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-cyan-500/10 p-4">
            <Upload className="h-8 w-8 text-cyan-400" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">
              Upload your files
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Click here to browse and attach documents.
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Supported: PDF, DOCX, TXT, CSV and Images
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}

                <div>
                  <p className="text-sm font-medium text-white">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}