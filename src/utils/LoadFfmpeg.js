import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

const loadFfmpeg = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = new FFmpeg();

    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                "application/wasm"
            ),
            workerURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.worker.js`,
                "text/javascript"
            ),
        });
        console.log("FFmpeg loaded successfully");
    } catch (error) {
        console.error("Failed to load FFmpeg", error);
    }

    return ffmpeg;
};

export default loadFfmpeg;