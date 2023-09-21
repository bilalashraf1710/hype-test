const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 8000;

console.log("In the App");

app.use(express.json());

app.post("/export-pdf", async (req, res) => {
  try {
    console.log("In", req.body);
    const { fullHtml } = req.body;

    if (!fullHtml) {
      return res.status(400).send("Id or HTML data not found");
    }

    console.log("At the Center of EXPORT PDF API CALL", fullHtml);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=write.pdf");
    res.send(pdfBuffer);
    console.log("At the END of EXPORT PDF API CALL");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
