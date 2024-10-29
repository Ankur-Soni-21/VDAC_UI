// Convert.jsx
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FileUpload from "./FileUpload";
import DragAndDrop from "./DragAndDrop";
import FileList from "./FileList";
import FileUtil from "@/utils/FileUtil";
import ConvertAllMenu from "./ConvertAllMenu";
import ConvertFile from "@/utils/ConvertFIle";
import loadFfmpeg from "@/utils/LoadFfmpeg";

const MAX_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE, 10) * 1024 * 1024; // Convert MB to bytes
const MAX_FILES = parseInt(import.meta.env.VITE_MAX_FILES, 10);

const fileUtil = new FileUtil();

function Convert({ isDarkMode }) {
  const [files, setFiles] = useState([]);
  const [fileLimitError, setFileLimitError] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");
  const [isFfmpegLoaded, setIsFfmpegLoaded] = useState(false);
  const ffmpegRef = useRef(null);

  const allowedFileTypes = useMemo(() => fileUtil.getAllowedFileTypes(), []);
  const allowedMimeTypes = useMemo(() => fileUtil.getMimeTypes(), []);

  const handleFileChange = useCallback(
    (newFiles) => {
      const remainingSlots = MAX_FILES - files.length;
      const filesToAdd = Array.from(newFiles).slice(0, remainingSlots);

      const processedFiles = filesToAdd.map((file) => ({
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        convertTo: "",
      }));

      const validFiles = processedFiles.filter((file) => file.size <= MAX_SIZE);

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    },
    [files]
  );

  const handleConvert = () => {
    
  };

  const load = async () => {
    const ffmpeg_response = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsFfmpegLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6 mt-6">
      {files.length === 0 ? (
        <DragAndDrop
          isDarkMode={isDarkMode}
          handleFileChange={handleFileChange}
          maxFiles={MAX_FILES}
          maxSize={MAX_SIZE}
          currentFileCount={files.length}
          fileLimitError={fileLimitError}
          fileSizeError={fileSizeError}
          setFileLimitError={setFileLimitError}
          setFileSizeError={setFileSizeError}
          allowedFileTypes={allowedFileTypes}
          allowedMimeTypes={allowedMimeTypes}
        />
      ) : (
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-end space-y-4 sm:space-y-0">
          <FileUpload
            isDarkMode={isDarkMode}
            handleFileChange={handleFileChange}
            maxFiles={MAX_FILES}
            maxSize={MAX_SIZE}
            fileLimitError={fileLimitError}
            fileSizeError={fileSizeError}
            currentFileCount={files.length}
            setFileLimitError={setFileLimitError}
            setFileSizeError={setFileSizeError}
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
                disabled={files.length === 0 && !isFfmpegLoaded}
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
