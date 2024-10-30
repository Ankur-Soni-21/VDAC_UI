class FileUtil {
    #fileCategories = {
        Images: ['PNG', 'JPEG', 'GIF', 'TIFF', 'WEBP', 'BMP'],
        Audio: ['MP3', 'WAV', 'FLAC'],
        Video: ['MP4', 'MOV', 'WEBM'],
    };

    #conversionRules = {
        Images: ['Images'],
        Audio: ['Audio', 'Video'],
        Video: ['Video', 'Audio'],
    };

    #mimeMap = {
        'PNG': 'image/png',
        'JPEG': 'image/jpeg',
        'GIF': 'image/gif',
        'TIFF': 'image/tiff',
        'BMP': 'image/bmp',
        'WEBP': 'image/webp',

        'MP3': 'audio/mpeg',
        'WAV': 'audio/wav',
        'FLAC': 'audio/flac',

        'MP4': 'video/mp4',
        'MOV': 'video/quicktime',
        'WEBM': 'video/webm',
    };

    get fileCategories() {
        return this.#fileCategories;
    }

    get conversionRules() {
        return this.#conversionRules;
    }

    getMimeTypes() {
        return Object.values(this.#fileCategories).flat().map(type => this.#mimeMap[type]);
    }

    getFileTypeFromMimeType(mimeType) {
        for (let type in this.#mimeMap)
            if (this.#mimeMap[type] === mimeType)
                return type;
        return "Unknown";
    }

    getAllowedFileTypes() {
        return Object.values(this.#fileCategories).flat().map(type => `.${type.toLowerCase()}`);
    }

    getFileCategory(fileType) {
        fileType = fileType.toUpperCase();
        for (let category in this.#fileCategories)
            if (this.#fileCategories[category].includes(fileType))
                return category;
        return "Unknown";
    }

    getAvailableCategories(fileType) {
        fileType = fileType.toUpperCase();
        let category = this.getFileCategory(fileType);
        return this.#conversionRules[category] || [];
    }

    getCommonCategories(files) {
        if (files.length === 0) return [];
        const allCategories = files.map(file => {
            const regex = /(?:\.([^.]+))?$/;
            const match = regex.exec(file.name);
            let fileType = match ? match[1].toUpperCase() : "Unknown";
            return this.getFileCategory(fileType);
        });
        // console.log(allCategories)

        const commonCategories = allCategories.reduce((acc, category) => {
            if (acc === null) return this.#conversionRules[category] || [];
            return acc.filter(cat => (this.#conversionRules[category] || []).includes(cat));
        }, null);
        return commonCategories || [];
    }
}
export default FileUtil;