require("dotenv").config();
const { OpenAI } = require("openai");
const fs = require("fs").promises;

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error("API key not found");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: API_KEY,
});

async function readFileContent(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
    console.log("----------------------------------------");
    runCHAT(data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function runCHAT(Data) {
  const response = await client.responses.create({
    model: "gpt-4o",
    instructions:
      "Rewrite each line where it should start with 'May Daniel' and only return to me the new sentences on a new line each",
    input: Data,
  });

  console.log(response.output_text);
  makeNewFile(response.output_text);
}

async function makeNewFile(Data) {
  fs.writeFile("afterText.txt", Data, (err) => {
    if (err) throw err;
    console.log("File has been created!");
  });
}

const data = readFileContent("beforeText.txt");
