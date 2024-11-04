import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, RefreshCcw } from "lucide-react";
import FileUpload from "./FileUpload";
import DragAndDrop from "./DragAndDrop";
import FileList from "./FileList";
import FileUtil from "@/utils/FileUtil";
import ConvertAllMenu from "./ConvertAllMenu";
import ConvertFile from "@/utils/FfmpegConvert";
import loadFfmpeg from "@/utils/LoadFfmpeg";
import JSZip from "jszip";

const MAX_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE, 10) * 1024 * 1024;
const MAX_FILES = parseInt(import.meta.env.VITE_MAX_FILES, 10);
const TIMEOUT_RACE = parseInt(import.meta.env.VITE_TIMEOUT_RACE) || 5000;

const fileUtil = new FileUtil();

function ConvertComponent({ isDarkMode }) {
  const [files, setFiles] = useState([]);
  const [fileLimitError, setFileLimitError] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");
  const [isFfmpegLoaded, setIsFfmpegLoaded] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
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
        isConverting: false,
        isConverted: false,
        convertedUrl: null,
        convertedFileName: null,
        error: null,
      }));

      const validFiles = processedFiles.filter((file) => file.size <= MAX_SIZE);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    },
    [files]
  );

  const convertFileWithTimeout = (file, targetFormat, ffmpeg) => {
    return Promise.race([
      ConvertFile(file, targetFormat, ffmpeg),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Conversion timed out")),TIMEOUT_RACE)
      ),
    ]);
  };

  // Convert.jsx (partial update - focusing on the conversion handling)
  const handleConvert = async () => {
    if (!ffmpegRef.current || files.length === 0) return;

    setIsConverting(true);

    try {
      const updatedFiles = [...files];

      // Convert files sequentially to avoid memory issues
      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        if (!file.convertTo || file.isConverted || file.error) continue;

        updatedFiles[i] = { ...file, isConverting: true, error: null };
        setFiles([...updatedFiles]);

        try {
          const { url, output } = await convertFileWithTimeout(
            file,
            file.convertTo,
            ffmpegRef.current
          );

          // console.log("Converted file:", output);

          updatedFiles[i] = {
            ...file,
            isConverting: false,
            isConverted: true,
            convertedUrl: url,
            convertedFileName: output,
            error: null,
          };
        } catch (error) {
          console.error("Conversion error:", error);

          // Clear any existing URL to prevent memory leaks
          if (updatedFiles[i].convertedUrl) {
            URL.revokeObjectURL(updatedFiles[i].convertedUrl);
          }

          updatedFiles[i] = {
            ...file,
            isConverting: false,
            isConverted: false,
            convertedUrl: null,
            convertedFileName: null,
            error: "Conversion failed",
          };
        }

        setFiles([...updatedFiles]);
        console.log("File : ", updatedFiles[i]);
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    } catch (error) {
      console.error("Unexpected error during conversion:", error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    files.forEach((file) => {
      if (file.isConverted && file.convertedUrl) {
        zip.file(
          file.convertedFileName,
          fetch(file.convertedUrl).then((res) => res.blob())
        );
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(content);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "converted_files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const resetFiles = () => {
    files.forEach((file) => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setFiles([]);
  };

  const allFilesConverted =
    files.length > 0 && files.every((file) => file.isConverted);
  const allFilesFailed = files.length > 0 && files.every((file) => file.error);
  const hasConvertibleFiles = files.some(
    (file) => !file.isConverted && !file.error && file.convertTo
  );

  const load = async () => {
    const ffmpeg_response = await loadFfmpeg();
    if(ffmpeg_response === null) console.log("Error loading ffmpeg");
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
            disabled={isConverting}
          />
          <div className="flex flex-col sm:flex-row w-full sm:gap-2 justify-end items-start sm:items-end space-y-4 sm:space-y-0">
            <ConvertAllMenu
              files={files}
              setFiles={setFiles}
              isDarkMode={isDarkMode}
              disabled={isConverting || allFilesConverted || allFilesFailed}
            />
            <div className="flex space-x-2 w-full sm:w-auto">
              {allFilesConverted ? (
                <Button
                  onClick={handleDownloadAll}
                  className={`w-full ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                  disabled={isConverting}
                >
                  Download All <Download className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleConvert}
                  className={`w-full ${
                    isDarkMode
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                  disabled={
                    !hasConvertibleFiles || !isFfmpegLoaded || isConverting
                  }
                >
                  {isConverting ? "Converting..." : "Convert"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <>
          <FileList
            files={files}
            setFiles={setFiles}
            isDarkMode={isDarkMode}
            isConverting={isConverting}
          />
          <div className="flex justify-center mt-4">
            <Button
              onClick={resetFiles}
              className={`${
                isDarkMode
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              disabled={isConverting}
            >
              Reset All <RefreshCcw className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ConvertComponent;
