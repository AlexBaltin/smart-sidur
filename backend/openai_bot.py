from openai import OpenAI
import re
import json

from .settings import OPEN_AI_API_KEY


with open("backend/prompt.md") as prompt_file:
    SYSTEM_PROMPT = prompt_file.read()

client = OpenAI(api_key=OPEN_AI_API_KEY)

def create_smartsidur(prefs:dict) -> str:

    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {
            "role": "system", 
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user",
            "content": str(prefs)
        }
    ]
    )
    return completion.choices[0].message.content


def extract_json_from_ai_response(markdown_string:str) -> dict | None:

    match = re.search(r'```json\n(.*?)\n```', markdown_string, re.DOTALL)
    
    if match:
        # Extract JSON string (the matched group)
        json_str = match.group(1)
        try:
            # Convert the extracted string to a Python dictionary
            return json.loads(json_str)
        except json.JSONDecodeError:
            print("Error: The extracted string is not valid JSON.")
            return None
    else:
        print(f"Error: No JSON block found in {markdown_string}")
        return None