// =============================Types definition====================================
/**
 * @typedef {Object} Dimmention
 * @property {number | undefined} width - the width of the image
 * @property {number | undefined} height - the height of the image
 */
/**
 * @typedef {Object} DimmentionsData
 * @property {number} outputImgWidth - the maximum width of all the images in the array
 * @property {number | undefined} outputImgHeight - the sum total of the heights of all the images in the array
 * @property {Dimmention[]} dimmentions - an array containing the dimensions (width and height) of each image in {width, height} format
 * @property {number} channels - the number of elements in the dimensions array, corresponding to the number of images processed
 * 
 */
// =============================Code Start here====================================
const imagemagick = require("imagemagick-stream");
const isstream = require("is-stream");
const assert = require("assert");
const streamtoarray = require('stream-to-array');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const ProgressBar = require('progress');

/**
 * 
 * @param {Buffer} pdf 
 * @param {number} page 
 * @param {*} bar 
 * @returns {Buffer} 
 */
const imagemagickconverter = async (pdf, page, bar) => {
    const imagemagickstream = imagemagick()
        .set('density', 200)
        .set('strip')
        .quality(90)
        .set("background", "white")
        .set("flatten");

    const onError = imagemagickstream.onerror;

    imagemagickstream.onerror = (err) => {
        if (Buffer.isBuffer(err)) {
            console.log(`Ignore the error in ImageMagick.:\n${err.toString()}`);
            return;
        }
        console.log(`Error:\n${err} from ImageMagick`);
        onError.apply(this, arguments);
    };

    imagemagickstream.input = `pdf:-[${page}]`;
    imagemagickstream.output = 'png:-';

    if (Buffer.isBuffer(pdf)) {
        imagemagickstream.end(pdf);
    } else {
        pdf.pipe(imagemagickstream);
    }

    const parts = await streamtoarray(imagemagickstream);
    const buffers = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part));
    const resultBuffer = Buffer.concat(buffers);

    if (bar) {
        bar.tick();
    }

    return resultBuffer;
}

/**
 * Converts PDF to Image/Buffer by supplying a file path
 * @param {Buffer} pdf Buffer pdf file
 * @param {number | number[] | 'all'} page 
 * @param {boolean} [progress=false] progress converting. Default `false`
 * @returns {Promise<Buffer[] | null>} PDF pages converted to image buffers
 */
const pdftobuffer = async (pdf, page, progress = false) => {
    const pdfcount = await pdftocount(pdf);

    assert(Buffer.isBuffer(pdf) || isstream.readable(pdf), 'The pdf must be either a readable stream or a buffer');

    if (page !== "all" && !Array.isArray(page)) {
        assert((pdfcount - 1) >= page, 'the page does not exist please try again');
        assert(typeof page === 'number', `page should be one number, given ${page}`);
        assert(Number.isInteger(page), `page should be an integer, given ${page}`);
        assert(page >= 0, `the page must be equal to or greater than 0 in the case of ${page}`);
    } else if(Array.isArray(page)) {
        Array.from(page, (_) => assert((pdfcount - 1) >= _, 'the page does not exist please try again'));
    }

    const bar = progress ? new ProgressBar('Processing [:bar] :percent :etas', { complete: '=', incomplete: ' ', width: 30, total: page === "all" ? pdfcount : 1 }) : null;

    if (page === "all" || Array.isArray(page)) {
        const promises = Array.from(Array.isArray(page) ? page : { length: pdfcount }, (_, index) => imagemagickconverter(pdf, Array.isArray(page) ? _ : index, progress ? bar : null));
        return Promise.all(promises);
    } else {
        return [await imagemagickconverter(pdf, page, progress ? bar : null)];
    }
}

/**
 * Determine the total number of pages in a PDF document by supplying the PDF to the function.
 * The function loads the PDF and returns the page count.
 * @param {Buffer} pdf Buffer pdf file
 * @returns {number} Total pages from the pdf passed in `pdf`
 */
const pdftocount = async (pdf) => {
    const pdfDoc = await PDFDocument.load(pdf);
    return pdfDoc.getPageCount();
};

/**
 * Concatenate multiple buffers into a single buffer by providing an array of buffers to the function. 
 * The function processes each buffer, appends them together, and returns the combined buffer.
 * @param {Buffer[]} buffers Array of buffers images
 * @returns {Promise<Buffer>} Combined array of buffer images
 */
const bufferstoappend = async (buffers) => {
    const dimmention = await getDimmentions(buffers);

    const outputImgWidth = dimmention.outputImgWidth;
    const outputImgHeight = dimmention.outputImgHeight;

    const compositeParams = await Promise.allSettled(buffers.map(async (buffer, index) => {
        const image = await sharp(buffer);
        const metadata = await image.metadata();
        const top = dimmention.dimmentions.slice(0, index).reduce((acc, item) => acc + item.height, 0);

        return {
            input: await image.resize(metadata.width).toBuffer(),
            gravity: "northwest",
            left: 0,
            top: top
        };
    }));

    const params = compositeParams.filter(result => result.status === 'fulfilled').map(result => result.value);

    return await sharp({
        create: {
            width: outputImgWidth,
            height: outputImgHeight,
            channels: dimmention.channels,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        }
    })
    .composite(params)
    .png()
    .toBuffer();
}

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
const getDimmentions = async (buffers) => {
    const promises = buffers.map(async (buffer) => {
        const bufferImage = await sharp(buffer);
        const metadata = await bufferImage.metadata();
        
        return {
            width: metadata.width,
            height: metadata.height
        }
    });

    const dimmentions = await Promise.all(promises);

    const max_width = Math.max(...dimmentions.map(item => item.width));
    const total_height = dimmentions.map(item => item.height).reduce((acc, item) => acc + item, 0);

    return {
        outputImgWidth: max_width,
        outputImgHeight: total_height,
        dimmentions,
        channels: dimmentions.length
    }
}

module.exports = { pdftocount, pdftobuffer, bufferstoappend, getDimmentions };

/*******************************************/
/***************** PDFTOPIC ****************/
/******* CREATE BY Ilyes-El-Majouti ********/
/*** https://github.com/Ilyes-El-Majouti ***/
/*******************************************/