const { pdftobuffer } = require("./");
const fs = require("fs");

test('converting pdf to png', () => {
    const pdf = fs.readFileSync('./ilyes.pdf', null);
    return expect(pdftobuffer(pdf, 0).then((buffer) => {
        fs.writeFileSync('./test.png', buffer, null);
    })).resolves.not.toBeNull();
});