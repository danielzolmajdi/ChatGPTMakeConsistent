import openai

openai.api_key = "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"

completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "What is the purpose of life?"}])
print(completion.choices[0].message['content'])