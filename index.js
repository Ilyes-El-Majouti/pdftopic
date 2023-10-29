const imagemagick = require("imagemagick-stream");
const isstream = require("is-stream");
const assert = require("assert");
const streamtoarray = require('stream-to-array');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const ProgressBar = require('progress');

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

const pdftocount = async (pdf) => {
    const pdfDoc = await PDFDocument.load(pdf);
    return pdfDoc.getPageCount();
};

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