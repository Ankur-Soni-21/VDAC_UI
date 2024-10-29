import {fetchFile } from "@ffmpeg/util";

function removeFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return fileName.slice(0, lastDotIndex);
    }
    return fileName;
}

function getFileExtension(file_name) {
    const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
    const match = regex.exec(file_name);
    if (match && match[1]) {
        return match[1];
    }
    return ''; // No file extension found
}

export default async function ConvertFile(file, newFormat, ffmpeg) {
    try {
        const input = "input" + '.' + getFileExtension(file.name);
        const output = removeFileExtension(file.name) + '.' + newFormat;
        await ffmpeg.writeFile(input, await fetchFile(file.file));

        const ffmpeg_cmd = ['-i', input, output];
        await ffmpeg.exec(ffmpeg_cmd);

        const fileData = await ffmpeg.readFile(output) || new Uint8Array(0);
        const blob = new Blob([fileData.buffer], { type: file.type.split('/')[0] });
        const url = URL.createObjectURL(blob);

        console.log('Conversion successful:', url,fileData,blob);
        return {url,output};
    } catch (error) {
        console.error('Error during conversion:', error);
        throw error;
    }
}