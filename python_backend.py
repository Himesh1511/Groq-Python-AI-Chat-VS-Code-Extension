import sys
import json
import aiohttp
import asyncio

GROQ_API_KEY = "YOUR_GROQ_API_KEY"

async def ask_groq(prompt):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama3-70b-8192",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 256
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, json=payload) as resp:
            if resp.status != 200:
                return f"Groq API error: {await resp.text()}"
            data = await resp.json()
            return (
                data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "No response from Groq API.").strip()
            )

async def main():
    input_str = sys.stdin.readline()
    try:
        input_obj = json.loads(input_str)
        prompt = input_obj.get("prompt")
        answer = await ask_groq(prompt)
        print(json.dumps({"answer": answer}))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"answer": f"Error: {str(e)}"}))
        sys.stdout.flush()

if __name__ == "__main__":
    asyncio.run(main())
