from pathlib import Path
from openai import OpenAI

textList = []

with open("beforeText.txt", "r") as file:
    for line in file:
        textList.append(line.strip())
    


client = OpenAI(api_key = "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")


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