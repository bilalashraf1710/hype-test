import express from 'express'
const puppeteer = require("puppeteer");


const app = express()

app.use(express.json())

const Port = 8000

app.get('/', function(req,res) {
    res.send("Hello")
})

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
        args: ["--no-sandbox"],
      });
  
      const page = await browser.newPage();
      await page.setContent(fullHtml);
      const pdfBuffer = await page.pdf({ format: "A4" });
  
      await browser.close();
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=write.pdf");
      res.send(pdfBuffer);
      console.log("At the END of EXPORT PDF API CALL");
    } catch (err:any) {
      res.status(500).send(err.message);
    }
  });

  
app.listen(Port,()=>{
    console.log("Running:")
})