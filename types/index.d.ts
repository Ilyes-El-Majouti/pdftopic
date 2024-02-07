export type Dimmention = {
    /**
     * - the width of the image
     */
    width: number | undefined;
    /**
     * - the height of the image
     */
    height: number | undefined;
};
export type DimmentionsData = {
    /**
     * - the maximum width of all the images in the array
     */
    outputImgWidth: number;
    /**
     * - the sum total of the heights of all the images in the array
     */
    outputImgHeight: number | undefined;
    /**
     * - an array containing the dimensions (width and height) of each image in {width, height} format
     */
    dimmentions: Dimmention[];
    /**
     * - the number of elements in the dimensions array, corresponding to the number of images processed
     */
    channels: number;
};
/**
 * Determine the total number of pages in a PDF document by supplying the PDF to the function.
 * The function loads the PDF and returns the page count.
 * @param {Buffer} pdf Buffer pdf file
 * @returns {number} Total pages from the pdf passed in `pdf`
 */
export function pdftocount(pdf: Buffer): number;
/**
 * Converts PDF to Image/Buffer by supplying a file path
 * @param {Buffer} pdf Buffer pdf file
 * @param {number | number[] | 'all'} page
 * @param {boolean} [progress=false] progress converting. Default `false`
 * @returns {Promise<Buffer[]>} PDF pages converted to image buffers
 */
export function pdftobuffer(pdf: Buffer, page: number | number[] | 'all', progress?: boolean | undefined): Promise<Buffer[]>;
/**
 * Concatenate multiple buffers into a single buffer by providing an array of buffers to the function.
 * The function processes each buffer, appends them together, and returns the combined buffer.
 * @param {Buffer[]} buffers Array of buffers images
 * @returns {Promise<Buffer>} Combined array of buffer images
 */
export function bufferstoappend(buffers: Buffer[]): Promise<Buffer>;
/**
 * Asynchronous function that takes an array of buffers as an argument.
 * The function returns an object containing the following information:
 *  - outputImgWidth: the maximum width of all the images in the array.
 *  - outputImgHeight: the sum total of the heights of all the images in the array.
 *  - dimmentions: an array containing the dimensions (width and height) of each image in {width, height} format.
 *  - channels: the number of elements in the dimensions array, corresponding to the number of images processed.
 * @param {Buffer[]} buffers Array of buffers images
 * @returns {Promise<DimmentionsData>} Dimmentions from the array of buffers images.
 */
export function getDimmentions(buffers: Buffer[]): Promise<DimmentionsData>;
//# sourceMappingURL=index.d.ts.map