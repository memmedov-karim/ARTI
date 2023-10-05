const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require("fs")
// Create a new PDFDocument
const test = async ()=>{
    const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// Add a blank page to the document
const page = pdfDoc.addPage()

// Get the width and height of the page
const { width, height } = page.getSize()

// Draw a string of text toward the top of the page
const fontSize = 30
page.drawText('Creating PDFs in JavaScript is awesome!', {
  x: 50,
  y: height - 4 * fontSize,
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})
page.drawText('This is pdf text format for test', {
    x: 10,
    y: height - 2* 10,
    size: 10,
    font: timesRomanFont,
    color: rgb(0,0,0),
  })

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()
fs.writeFileSync("./test.pdf", pdfBytes);

}

test()
// Example usage
// modifyPdf('./hasan.pdf', './modified-certificate.pdf', 'EXPERIENCE', 'John Doe');
