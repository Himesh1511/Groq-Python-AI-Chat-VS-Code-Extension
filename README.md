# Groq Python AI Chat VS Code Extension

A Visual Studio Code extension that brings Groq-powered AI chat directly to your editor! Ask questions, get code help, or just chat—all powered by the `llama3-70b-8192` model via the Groq API.

---

## ✨ Features

- **Chat UI inside VS Code:** Seamless conversational interface.
- **Groq API integration:** AI answers using the latest Llama 3 model.
- **Python backend:** Handles API calls securely and efficiently.
- **Cross-platform:** Works on Windows, macOS, and Linux.
- **Easy setup:** Minimal configuration required.

---

## 🏗️ Project Structure

| File/Folder          | Purpose                                                      |
|----------------------|--------------------------------------------------------------|
| `extension.js`       | Main VS Code extension logic, process management, messaging  |
| `python_backend.py`  | Python backend, talks to Groq API, returns JSON              |
| `webview.html`       | Chat frontend (UI) shown inside VS Code                      |
| `package.json`       | Extension manifest, activation commands, dependencies        |
| `README.md`          | (This file) Documentation                                    |

---

## 🚀 Setup & Usage

### 1. **Clone the Repository**

```bash
git clone https://github.com/Himesh1511/Groq-Python-AI-Chat-VS-Code-Extension.git
cd Groq-Python-AI-Chat-VS-Code-Extension
```

### 2. **Install Python Dependencies**

Make sure you have Python 3 installed. Then run:

```bash
pip install aiohttp
```

### 3. **Configure Your Groq API Key**

Your API key is set in `python_backend.py` as `GROQ_API_KEY`.  
**For production, set this securely!**

### 4. **Install Dependencies (Node.js, if any)**

Most extensions don't need extra packages, but if you add any, run:

```bash
npm install
```

### 5. **Launch the Extension**

- Open the project in VS Code.
- Press `F5` to launch the extension in a new Extension Development Host window.
- Open the command palette (`Ctrl+Shift+P`), type `Groq Python AI Chat`, and hit Enter.

---

## 🖥️ How It Works

1. **Frontend (`webview.html`):**  
   User types a prompt in the chat UI.

2. **Extension Host (`extension.js`):**  
   - Receives the prompt.
   - Spawns `python_backend.py` as a subprocess.
   - Sends the prompt as JSON via stdin.

3. **Backend (`python_backend.py`):**  
   - Reads the prompt.
   - Calls the Groq API (Llama 3).
   - Returns the answer in JSON via stdout.

4. **Frontend:**  
   Displays the AI's answer in the chat window.

---

## 🛠️ Customization

- **Model:** To change the model, edit the `"model"` field in `python_backend.py`.
- **API Key:** Never commit your real API key! Use environment variables or a config file for production.

---

## ⚠️ Troubleshooting

- **Python not found:**  
  Make sure Python is installed and added to your PATH.

- **`ModuleNotFoundError: No module named 'aiohttp'`:**  
  Run `pip install aiohttp`.

- **“Error parsing response from Python.”:**  
  Usually due to Python script outputting non-JSON, or extension miscommunication.  
  Check the debug console for details.

---

## 📝 License

[MIT License](LICENSE)

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Open an issue to discuss your ideas or report bugs.

---

## 📄 Credits

- [Groq](https://groq.com/) for the API and Llama 3 model.
- VS Code Extension API.
- Inspired by open-source AI chat projects.
