import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "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",
});



import fs from 'fs/promises';

async function readFileContent(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      console.log(data);
      console.log('----------------------------------------');
      runCHAT(data)
    } catch (error) {
      console.error('Error reading file:', error);
    }

}


async function runCHAT(Data){
    const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: "Rewrite each line where it should start with 'May Daniel' and only return to me the new sentences on a new line each",
        input: Data,
      });

    console.log(response.output_text)
    makeNewFile(response.output_text)
}


async function makeNewFile(Data) {
    fs.writeFile('afterText.txt', Data, (err) => {
        if (err) throw err;
        console.log('File has been created!');
    });
}




const data = readFileContent("beforeText.txt")