// import from pdf-lib
import { PDFDocument } from "pdf-lib";

// imports from vieolo
import { fileToArrayBuffer } from "@vieolo/file-management";

// photon
import photon from "@silvia-odwyer/photon";

type uploadedFile = {
  file: File;
  id: number;
  type: "pdf" | "jpg" | "png";
};

// converting the png to pdf
export async function pdfConverter(files: uploadedFile[]) {
  const newPdfFiles = [];
  for (let file of files) {
    // get the image file out of th uploaded File
    const pngFile = file.file;
    // get the size of the image file
    const pngImageBytes = pngFile.size;
    console.log(pngImageBytes);
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    // Embed the JPG image bytes
    const pngImage = await pdfDoc.embedPng(await fileToArrayBuffer(pngFile));
    // Get the width/height of the JPG image scaled down to 25% of its original size
    const pngDims = pngImage.scale(0.5);
    // Add a blank page to the document
    const page = pdfDoc.addPage();
    // Draw the JPG image in the center of the page
    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - pngDims.width / 2,
      y: page.getHeight() / 2 - pngDims.height / 2,
      width: pngDims.width,
      height: pngDims.height,
    });
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    console.log(await pdfBytes);
    // push this to the array
    newPdfFiles.push(await pdfBytes);
  }
  return newPdfFiles;
}

// Download single blob
export function downloadFile(file: Blob, fileName?: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, `${fileName}.png`);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = `${fileName}.png`;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

// Download single blob
export function downloadMergedFile(file: Blob, fileName?: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, `${fileName}.pdf`);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = `${fileName}.pdf`;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}