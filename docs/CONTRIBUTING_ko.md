# 📝 LiveTune 프론트엔드 기여하기

저희 프로젝트에 관심을 가져주셔서 감사합니다! LiveTune 플랫폼을 함께 개선하고 협업하게 되어 기쁩니다. 시작하기 전에 잠시 시간을 내어 이 가이드라인을 검토해 주세요.
[Go to english CONTRIBUTING](../CONTRIBUTING.md)

> [!IMPORTANT]
> 이 프로젝트에 기여하고자 하는 개발자분들께서는 다음 내용을 주의 깊게 읽어주시기 바랍니다.

## 📚 Table of Contents

- [⚙️ 사전 준비 사항](#️-사전-준비-사항)
- [🔧 프로젝트 설정](#-프로젝트-설정)
- [📝 기여 가이드라인](#-기여-가이드라인)
- [📁 폴더 구조](#-폴더-구조)

---

## ⚙️ 사전 준비 사항

기여하기 전에 다음 사항들이 준비되어 있는지 확인해 주세요:

- [Node.js](https://nodejs.org/)와 npm 설치 (v22.14.0 이상)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (권장)

---

## 🔧 프로젝트 설정

시작하기 전에, 개발 환경을 설정하기 위해 다음 내용을 주의 깊게 읽어주세요.

저장소를 복제합니다.

```bash
git clone git@github.com:Live-Tune/LiveTune-fe.git
cd LiveTune-fe
```

git 커밋 템픞릿을 설정하세요.

```bash
git config commit.template .gitmessage
```

라이브러리와 관련 종속 패키지를 설치하세요

```bash
npm install
```

Run development server to check everything is working.

```bash
npm run dev
```

**축하합니다! 이 프로젝트에 기여할 준비가 끝났습니다.**

---

## 📝 기여 가이드라인

### 네이밍 규칙

#### 파일 이름

- React 컴포넌트(.jsx) 파일명은 PascalCase여야 합니다. 예시: YourOwnComponent.jsx
- 일반 JavaScript(.js) 파일명은 camelCase여야 합니다. 예시: yourOwnFunctions.js
- 일반 HTML, CSS 파일명은 소문자여야 합니다. 예시: index.html, style.css

#### 함수 & 변수

- 함수와 변수는 React 컴포넌트를 제외하고 camelCase여야 합니다.

### Git 사용하기

- 커밋할 때, `-m` 옵션 없이 `git commit`을 사용하고 템플릿 형식을 준수해 주세요.
- 이 프로젝트에 푸시 권한이 있는 경우, 다른 협업자의 작업을 덮어쓸 수 있으므로 `--force` 옵션 사용을 자제해 주세요.

### 개발하기

1. 이 저장소를 포크하세요.
2. '${YourGithubID}/contribute' 라는 이름의 새로운 브랜치를 만드세요.
3. 해당 브랜치에서 작업하세요.
4. 작업이 완료되면 설명을 포함하여 PR(Pull Request)을 요청하세요. 설명에는 다음 내용을 포함해 주세요:
   - 무엇을 했는지
   - 이 작업이 왜 해당 프로젝트에 필요한지

---

## 📁 폴더 구조

```
LiveTune-fe
├── public      # 공개용 미디어 소스
└── src         # 프로젝트 코드 파일
    │
    ├── apis        # 백엔드 통신 인터페이스 함수
    ├── assets      # 프로젝트용 미디어 소스
    ├── components  # 페이지 구성 요소
    ├── contexts    # 사용자명(context) 선언
    ├── pages       # 라우팅용 페이지
    ├── shared      # 라우터 선언
    └── styles      # 컴포넌트 스타일

```

---
