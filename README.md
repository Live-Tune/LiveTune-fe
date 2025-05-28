# 🎵 LiveTune Front-end

Welcome to the **LiveTune Front-end** repository!  
This project contains the front-end logic for the LiveTune app.

## 📚 Table of Contents

- [📖 About](#-about)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 How to Run the Project](#-how-to-run-the-project)
- [🔧 Project Setup](#-project-setup)
- [📝 Contributing Guidelines](#-contributing-guidelines)
- [📁 Folder Structure](#-folder-structure)
- [📤 Pushing Code](#-pushing-code)


---
## 📖 About

This repository handles all front-end development for the LiveTune platform.

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (vXX or higher)
- [npm](https://www.npmjs.com/)
- Git



## 🚀 How to Run the Project

1. Clone the repository:
    ```bash
    git clone git@github.com:Live-Tune/LiveTune-fe.git
    cd LiveTune-fe
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and go to e.g. [http://localhost:8080](http://localhost:8080)


## 🔧 Project setup

Before starting development, please correctly set up your Git commit template.

```
git clone git@github.com:Live-Tune/LiveTune-fe.git
cd LiveTune-fe
git config commit.template .gitmessage
```

## 📝Contributing Guidelines


> [!IMPORTANT]
> For developers interested in contributing to this project, please read the following carefully.



## 📁 Folder Structure 
```
LIVETUNE/
└── LiveTune-fe/
    ├── node_modules/
    ├── src/             #Source code folder — contains all app logic.
    │   ├── assets/      #Stores static assets like image logo.
    │   ├── components/  #Reusable UI blocks like panels and controls.
    │   ├── pages/       #Full pages or views (e.g., Login, Main, Room creation).
    │   ├── shared/      #Router
    │   └── styles/      #Global or modular CSS files used for styling.

```
## 📤Committing

When committing, please use `git commit` without the `-m` option and adhere to the template format.

## 📤 Pushing

If you have push access to this project, please refrain from using the `--force` option, as it can overwrite the work of other collaborators.
