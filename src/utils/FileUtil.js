class FileUtil {
    #fileCategories = {
        Document: ['PDF', 'DOC', 'DOCX', 'TXT', 'RTF', 'ODT'],
        Presentation: ['PPT', 'PPTX', 'ODP', 'KEY'],
        Images: ['PNG', 'JPEG', 'JPG', 'GIF', 'TIFF', 'WEBP'],
        'Audio & Video': ['MP3', 'WAV', 'AAC', 'FLAC', 'MP4', 'AVI', 'MOV', 'WEBM'],
    };

    #conversionRules = {
        Document: ['Document', 'Presentation'],
        Presentation: ['Document', 'Presentation'],
        Images: ['Images'],
        'Audio & Video': ['Audio & Video'],
    };

    #mimeMap = {
        'PDF': 'application/pdf',
        'DOC': 'application/msword',
        'DOCX': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'TXT': 'text/plain',
        'RTF': 'application/rtf',
        'ODT': 'application/vnd.oasis.opendocument.text',
        'PPT': 'application/vnd.ms-powerpoint',
        'PPTX': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'ODP': 'application/vnd.oasis.opendocument.presentation',
        'KEY': 'application/x-iwork-keynote-sffkey',
        'PNG': 'image/png',
        'JPEG': 'image/jpeg',
        'JPG': 'image/jpeg',
        'GIF': 'image/gif',
        'TIFF': 'image/tiff',
        'BMP': 'image/bmp',
        'WEBP': 'image/webp',
        'MP3': 'audio/mpeg',
        'WAV': 'audio/wav',
        'AAC': 'audio/aac',
        'FLAC': 'audio/flac',
        'MP4': 'video/mp4',
        'AVI': 'video/x-msvideo',
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
            let fileType = file.name.split('.').pop().toUpperCase();
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
// const fileUtil = new FileUtil();
// console.log(fileUtil.getCommonCategories( [{ name: 'file.pptx' }]));
export default FileUtil;