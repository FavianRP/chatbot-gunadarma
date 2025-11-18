
# NLP Gunadarma Chatbot — Frontend (Node.js) + Backend (Python)

**Choose language / Pilih bahasa:**
- [Bahasa Indonesia](#bahasa-indonesia)
- [English Version](#english-version)

---

## Bahasa Indonesia

### Intermezzo
Projek ini dibuat untuk memenuhi tugas Sains Data – Natural Language Processing berbasis Chatbot. Chatbot ini melayani pertanyaan seputar Universitas Gunadarma.

---

### Persyaratan

Pastikan perangkat lunak berikut sudah terinstal di sistem Anda:
- **Node.js + npm** ([https://nodejs.org/](https://nodejs.org/))
- **Python 3.8+** ([https://www.python.org/downloads/](https://www.python.org/downloads/))

Anda dapat memeriksa instalasi dengan menjalankan perintah berikut di terminal:
```bash
node -v
npm -v
python --version
```

---

### Pengaturan Backend (Python)

1.  Buat sebuah *virtual environment* untuk mengisolasi dependencies proyek:
    ```bash
    python -m venv venv
    ```

2.  Aktifkan *virtual environment*:
    - **Windows:**
      ```bash
      venv\Scripts\activate
      ```
    - **Mac/Linux:**
      ```bash
      source venv/bin/activate
      ```

3.  Instal semua dependencies yang dibutuhkan dari file `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

---

### Pengaturan Frontend (npm)

1.  Masuk ke direktori root proyek, lalu instal dependencies Node.js:
    ```bash
    npm install
    ```

2.  Jika terjadi kegagalan, Anda mungkin perlu menginstal `vite` dan `tailwindcss` secara manual:
    ```bash
    npm install vite tailwindcss@3
    ```

---

### Menjalankan Aplikasi

#### Metode A — Manual (menggunakan dua terminal)

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
python backend/api.py
```

#### Metode B — Menggunakan Runner Script

*Runner script* akan menjalankan frontend dan backend secara bersamaan dalam satu perintah.

- **Windows:**
  ```bash
  runner_windows.bat
  ```

- **Linux:**
  ```bash
  ./runner_linux.sh
  ```

---

### Troubleshooting

- **Jika `pip` mengalami error saat instalasi:**
  Coba perbarui `pip` ke versi terbaru, lalu jalankan kembali perintah instalasi.
  ```bash
  pip install --upgrade pip
  pip install -r requirements.txt
  ```

- **Jika terjadi konflik port:**
  Ubah nomor port pada file konfigurasi frontend atau backend Anda.

---
---

## English Version

### Overview
This project was created to fulfill a Data Science – Natural Language Processing assignment. The chatbot is designed to answer questions related to Gunadarma University.

---

### Requirements

Ensure you have the following software installed on your system:
- **Node.js + npm** ([https://nodejs.org/](https://nodejs.org/))
- **Python 3.8+** ([https://www.python.org/downloads/](https://www.python.org/downloads/))

You can check your installations by running the following commands in your terminal:
```bash
node -v
npm -v
python --version
```

---

### Backend Setup (Python)

1.  Create a virtual environment to isolate the project's dependencies:
    ```bash
    python -m venv venv
    ```

2.  Activate the virtual environment:
    - **Windows:**
      ```bash
      venv\Scripts\activate
      ```
    - **Mac/Linux:**
      ```bash
      source venv/bin/activate
      ```

3.  Install the required packages from the `requirements.txt` file:
    ```bash
    pip install -r requirements.txt
    ```

---

### Frontend Setup (npm)

1.  From the project's root directory, install the Node.js dependencies:
    ```bash
    npm install
    ```

2.  If errors occur, you may need to install `vite` and `tailwindcss` manually:
    ```bash
    npm install vite tailwindcss@3
    ```

---

### Running the Application

#### Method A — Manual (using two terminals)

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
python backend/api.py
```

#### Method B — Using a Runner Script

The runner script will start both the frontend and backend concurrently.

- **Windows:**
  ```bash
  runner_windows.bat
  ```

- **Linux:**
  ```bash
  ./runner_linux.sh
  ```

---

### Troubleshooting

- **If `pip` fails during installation:**
  Try upgrading `pip` to the latest version, then run the installation command again.
  ```bash
  pip install --upgrade pip
  pip install -r requirements.txt
  ```

- **If a port conflict occurs:**
  Change the port number in your frontend or backend configuration files.
