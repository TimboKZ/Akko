/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const SourceTypes = {
    URL: 'url',
    FILE: 'file',
    ARRAY_BUFFER: 'arrayBuffer',
};

class Track {

    /**
     * @param {object} data
     * @param {string|File} data.source
     * @param {string} [data.title]
     */
    constructor(data) {
        this.source = data.source;
        this.title = data.title;
        this.arrayBufferCache = null;
        this.analyseSource();
    }

    analyseSource() {
        if (typeof this.source === 'string') {
            this.sourceType = SourceTypes.URL;
            this.title = this.title || decodeURIComponent(this.source.split('/').pop().replace(/\.[a-zA-Z0-9]+$/, ''));
        } else if (this.source instanceof File) {
            this.sourceType = SourceTypes.FILE;
            this.title = this.title || this.source.name.replace(/\.[a-zA-Z0-9]+$/, '');
        } else if (this.source instanceof ArrayBuffer) {
            this.sourceType = SourceTypes.ARRAY_BUFFER;
            this.title = this.title || 'Untitled';
        } else {
            throw new Error(`'Unsupported Track source type: ${this.source}`);
        }
    }

    /**
     * @return {Promise.<ArrayBuffer>}
     */
    prepareArrayBuffer() {
        if (this.arrayBufferCache) return Promise.resolve(this.arrayBufferCache);
        switch (this.sourceType) {
            case SourceTypes.URL:
                return window.fetch(this.source)
                    .then(response => {
                        let arrayBuffer = response.arrayBuffer();
                        this.arrayBufferCache = arrayBuffer;
                        return arrayBuffer;
                    });
            case SourceTypes.FILE:
                return new Promise((resolve, reject) => {
                    let reader = new window.FileReader();
                    reader.onload = fileEvent => {
                        let arrayBuffer = fileEvent.target.result;
                        this.arrayBufferCache = arrayBuffer;
                        resolve(arrayBuffer);
                    };
                    reader.onerror = error => {
                        reject(error);
                    };
                    reader.readAsArrayBuffer(this.source);
                });
            case SourceTypes.ARRAY_BUFFER:
                return Promise.resolve(this.source);
            default:
                return Promise.reject(new Error(`'Unsupported track source type: ${this.sourceType}`));
        }
    }

}

module.exports = Track;
module.exports.SourceTypes = SourceTypes;
