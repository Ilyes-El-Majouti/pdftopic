const imagemagick = require("imagemagick-stream");
const isstream = require("is-stream");
const assert = require("assert");
const streamtoarray = require('stream-to-array');

function pdftostream(pdf, page) {
    assert(Buffer.isBuffer(pdf) || isstream.readable(pdf), 'The pdf must be either a readable stream or a buffer');
    assert(typeof page === 'number', `page should be one number, given ${page}`);
    assert(page % 1 === 0, `page should be an integer, given ${page}`);
    assert(page >= 0, `the page must be equal to or greater than 0 in the case of ${page}`);
    
    const imagemagickstream = imagemagick()
        .set('density', 200)
        .set('strip')
        .quality(90);
        
    const onError = imagemagickstream.onerror;

    imagemagickstream.onerror = (err) => {
        if (Buffer.isBuffer(err)) {
            console.log(`Ignore the error in ImageMagick.:\n${err.toString()}`);
            return;
        }
        console.log(`Error:\n${err} from ImageMagick`);
        onError.apply(this, arguments);
    };

    if (typeof page !== 'undefined') {
        imagemagickstream.input = `pdf:-[${page}]`;
    }

    imagemagickstream.output = 'png:-';

    if (Buffer.isBuffer(pdf)) {
        imagemagickstream.end(pdf);
    } else {
        pdf.pipe(imagemagickstream);
    }

    return imagemagickstream;
}

function pdftobuffer(pdf, page) {
    return streamtoarray(pdftostream(pdf, page)).then((parts) => {
        const buffers = parts.map((part) => {
            return Buffer.isBuffer(part) ? part : Buffer.from(part);
        });
        return Buffer.concat(buffers);
    });
}

module.exports = { pdftostream, pdftobuffer }

/*******************************************/
/************** PDF TO IMAGE ***************/
/******* CREATE BY Ilyes-El-Majouti ********/
/*** https://github.com/Ilyes-El-Majouti ***/
/*******************************************/