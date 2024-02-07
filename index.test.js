const pdftopic = require("./");
const fs = require('fs');

test('converting pdftopic@1.0.0 (single file)', async () => {
    const pdf = fs.readFileSync('./pdf_files/ilyes.pdf');
    const result = await pdftopic.pdftobuffer(pdf, 0);
    expect(result).not.toBeNull();
});

test('converting pdftopic@1.0.0 (specific files)', async () => {
    const pdf = fs.readFileSync('./pdf_files/curriculum_vitae.pdf');
    const result = await pdftopic.pdftobuffer(pdf, [ 1, 3 ]);
    expect(result).not.toBeNull();
});

test('converting pdftopic@1.0.0 (multiple file)', async () => {
    const pdf = fs.readFileSync('./pdf_files/curriculum_vitae.pdf');
    const result = await pdftopic.pdftobuffer(pdf, "all");
    expect(result).not.toBeNull();
});

test('converting pdftopic@1.0.0 (all images in one image)', async () => {
    const file1 = fs.readFileSync('./curriculum_vitae-converted/curriculum_vitae-0.png');
    const file2 = fs.readFileSync('./curriculum_vitae-converted/curriculum_vitae-1.png');
    const file3 = fs.readFileSync('./curriculum_vitae-converted/curriculum_vitae-2.png');
    const file4 = fs.readFileSync('./curriculum_vitae-converted/curriculum_vitae-3.png');

    const allfiles = [ file1, file2, file3, file4 ];

    const result = await pdftopic.bufferstoappend(allfiles);
    
    expect(result).not.toBeNull();
    fs.writeFileSync('./curriculum_vitae.png', result);
});