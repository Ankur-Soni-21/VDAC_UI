// Convert.jsx
import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Container } from "lucide-react";
import FileUpload from "./FileUpload";
import DragAndDrop from "./DragAndDrop";
import FileList from "./FileList";
import FileUtil from "@/utils/FileUtil";
import ConvertAllMenu from "./ConvertAllMenu";


const MAX_FILES = parseInt(import.meta.env.VITE_MAX_FILES, 10);

const fileUtil = new FileUtil();

function Convert({ isDarkMode }) {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const allowedFileTypes = useMemo(() => fileUtil.getAllowedFileTypes(), []);
  const allowedMimeTypes = useMemo(() => fileUtil.getMimeTypes(), []);

  const handleFileChange = useCallback(
    (newFiles) => {
      const remainingSlots = MAX_FILES - files.length;
      const filesToAdd = Array.from(newFiles).slice(0, remainingSlots);
      const rejectedFiles = newFiles.length - filesToAdd.length;

      const processedFiles = filesToAdd.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        convertTo: "",
      }));

      setFiles((prevFiles) => [...prevFiles, ...processedFiles]);

      if (rejectedFiles > 0) {
        setErrorMessage(
          `Only ${filesToAdd.length} file(s) were added. ${rejectedFiles} file(s) were rejected as the maximum limit of ${MAX_FILES} files has been reached.`
        );
        setTimeout(() => setErrorMessage(""), 7000);
      }
    },
    [files]
  );

  const handleConvert = () => {
    // console.log("Converting files:", files);
  };

  return (
    <div className="space-y-6 mt-6">
      {files.length === 0 ? (
        <DragAndDrop
          isDarkMode={isDarkMode}
          handleFileChange={handleFileChange}
          maxFiles={MAX_FILES}
          currentFileCount={files.length}
          errorMessage={errorMessage}
          allowedFileTypes={allowedFileTypes}
          allowedMimeTypes={allowedMimeTypes}
        />
      ) : (
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-end space-y-4 sm:space-y-0">
          <FileUpload
            isDarkMode={isDarkMode}
            handleFileChange={handleFileChange}
            maxFiles={MAX_FILES}
            currentFileCount={files.length}
            errorMessage={errorMessage}
            allowedFileTypes={allowedFileTypes}
            allowedMimeTypes={allowedMimeTypes}
          />
          <div className="flex flex-col sm:flex-row w-full sm:gap-2 justify-end items-start sm:items-end space-y-4 sm:space-y-0">
            <ConvertAllMenu
              files={files}
              setFiles={setFiles}
              isDarkMode={isDarkMode}
            />
            <div className="flex space-x-2 w-full sm:w-auto">
              <Button
                onClick={handleConvert}
                className={`w-full ${
                  isDarkMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
                disabled={files.length === 0}
              >
                Convert <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <FileList files={files} setFiles={setFiles} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}

export default Convert;
