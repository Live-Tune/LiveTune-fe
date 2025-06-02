# 📝 Contributing to LiveTune Front-end

Thank you for your interest in contributing! We're excited to collaborate and improve the LiveTune platform together. Please take a few moments to review this guide before you begin.

> [!IMPORTANT]
> For developers interested in contributing to this project, please read the following carefully.

## 📚 Table of Contents

- [⚙️ Prerequisites](#️-prerequisites)
- [🔧 Project Setup](#-project-setup)
- [📝 Contributing Guidelines](#-contributing-guidelines)
- [📁 Folder Structure](#-folder-structure)

---

## ⚙️ Prerequisites

Before contributing, ensure you have:

- [Node.js](https://nodejs.org/) with npm installed (v22.14.0 or higher)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)

---

## 🔧 Project Setup

Before starting, please read following carefully to setup your development enviromnent.

Clone our repository.

```bash
git clone git@github.com:Live-Tune/LiveTune-fe.git
cd LiveTune-fe
```

Set up your git commit template.

```bash
git config commit.template .gitmessage
```

Install required libraries and dependencies.

```bash
npm install
```

Run development server to check everything is working.

```bash
npm run dev
```

**Great, You are ready to go!**

---

## 📝 Contributing Guidelines

### Naming

#### File

- React component(.jsx) filename should be PascalCase e.g. YourOwnComponent.jsx
- Plain javascript(.js) filename should be camelCase e.g. yourOwnFunctions.js
- Vanilla html, css file name shoud be in lowercase e.g. index.html, style.css

#### Functions & Variables

- Functions and variables should be camelCase except for react components

### Using Git

- When committing, please use `git commit` without the `-m` option and adhere to the template format.
- If you have push access to this project, please refrain from using the `--force` option, as it can overwrite the work of other collaborators.

---

## 📁 Folder Structure

```
LiveTune-fe
├── public  # Media sources for public use
└── src     # Code files for the project
    │
    ├── apis        # Backend communication interface functions
    ├── assets      # Media sources for the project
    ├── components  # Components for pages
    ├── contexts    # Context declaration for username
    ├── pages       # Pages for routing
    ├── shared      # Router declaration
    └── styles      # Styles for components

```

---
