from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
import os

textList = []

with open("beforeText.txt", "r") as file:
    for line in file:
        textList.append(line.strip())
    
load_dotenv()
getAPIKey = os.getenv("OPENAIAPIKEY")

client = OpenAI(api_key = getAPIKey)


for i in range(len(textList)):
    newLine = textList[i]
    
    response = client.responses.create(
    model="gpt-4o",
    instructions="You are a writing editer",
    input="make this sentence start with the words 'May Daniel' and only return to me the new sentence: " + newLine,
    max_output_tokens=50
    )

    textList[i] = response.output_text


for i in range(len(textList)):
    print(textList[i])


with open("afterText.txt", "a") as file:
    for i in range(len(textList)):
        file.write(textList[i]+"\n")