// ConvertFile.js
import { fetchFile } from "@ffmpeg/util";
const TIMEOUT_FFMPEG = parseInt(import.meta.env.VITE_TIMEOUT_FFMPEG) || 5000;

function removeFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return fileName.slice(0, lastDotIndex);
    }
    return fileName;
}

function getFileExtension(file_name) {
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(file_name);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}


export default async function ConvertFile(file, newFormat, ffmpeg) {
    const input = `input_${Date.now()}.${getFileExtension(file.name)}`;
    const output = `output_${Date.now()}.${newFormat}`;


    try {
        // Clean up any existing files first
        try {
            await ffmpeg.deleteFile(input);
            await ffmpeg.deleteFile(output);
        } catch (e) {
            // Ignore deletion errors for non-existent files
        }

        // Write the input file
        const fileData = await fetchFile(file.file);
        await ffmpeg.writeFile(input, fileData);

        // Execute the conversion with timeout
        const ffmpeg_cmd = ['-i', input, output];
        console.log("Input file:", input);
        await ffmpeg.exec(ffmpeg_cmd, TIMEOUT_FFMPEG);

        // Read the output file
        const data = await ffmpeg.readFile(output);
        if (!data) {
            throw new Error('No output file generated');
        }

        // Create blob and URL
        const blob = new Blob([data.buffer], { type: file.type.split('/')[0] });
        const url = URL.createObjectURL(blob);
        const finalOutputName = `${removeFileExtension(file.name)}.${newFormat}`;

        return { url, output: finalOutputName };

    } catch (error) {
        console.error('Error during conversion:', error);
        throw error;
    } finally {
        // Ensure cleanup
        try {
            await ffmpeg.deleteFile(input);
            await ffmpeg.deleteFile(output);
        } catch (e) {
            // Ignore cleanup errors
        }
    }
}