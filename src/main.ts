import * as pup from "puppeteer";
import { promises as fs_promises } from "fs";

async function printPDF() {
  console.log("Starting PDF Generation...");

  const browser = await pup.launch({ headless: true });
  const page = await browser.newPage();
  await page
    .goto("http://127.0.0.1:5500", { waitUntil: "networkidle0" })
    .catch((err) => {
      console.error(err);
    });

  const pdf = await page
    .pdf({
      path: "output/Hetti Arachchige Anjalo Prabhashvara.pdf",
      format: "A4",
      margin: {
        top: "0.2in",
        bottom: "0.2in",
        left: "0.2in",
        right: "0.2in",
      },
      printBackground: true,
    })
    .then(() => {
      console.log("PDF generated successfully!");
    })
    .catch((err) => {
      console.error("Error occurred: " + err);
    });

  await browser.close();
  return pdf;
}

async function main() {
  await fs_promises.mkdir("./output").catch((err) => {
    if (err.errno === -17) {
      console.error("Output directory already exists. Skip creating...");
    } else {
      console.error(err);
    }
  });
  await printPDF();
}

main();
