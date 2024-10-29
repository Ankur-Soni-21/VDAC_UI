import { FileText, Image, Video, Music, File } from 'lucide-react';
import FileUtil from './FileUtil.js';
const fileUtil = new FileUtil();

export function getFileIcon(fileType) {
  const category = fileUtil.getFileCategory(fileType);
  switch (category) {
    case 'Document':
      return FileText;
    case 'Images':
      return Image;
    case 'Audio & Video':
      return fileType.startsWith('audio') ? Music : Video;
    default:
      return File;
  }
}
