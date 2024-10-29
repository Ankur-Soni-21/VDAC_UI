import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SelectMenu from "./SelectMenu";
import FileUtil from "@/utils/FileUtil";
const fileUtil = new FileUtil();

export default function ConvertAllMenu({ files, setFiles, isDarkMode }) {
  const [showConvertAllMenu, setShowConvertAllMenu] = useState(false);
  // console.log(files);
  const commonCategories = fileUtil.getCommonCategories(files);

  const handleConvertAll = (format) => {
    setFiles(files.map((file) => ({ ...file, convertTo: format })));
    setShowConvertAllMenu(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <Button
        onClick={() => setShowConvertAllMenu(!showConvertAllMenu)}
        className="w-full sm:w-auto bg-white text-black border border-black hover:bg-gray-100"
        disabled={commonCategories.length === 0}
      >
        Convert All
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      {showConvertAllMenu && commonCategories.length > 0 && (
        <div className="absolute right-0 top-full mt-2 z-10 py-2 w-full sm:w-96">
          <SelectMenu
            onFormatSelect={handleConvertAll}
            onClickOutside={() => setShowConvertAllMenu(false)}
            isDarkMode={isDarkMode}
            commonCategories={commonCategories}
          />
        </div>
      )}
    </div>
  );
}
