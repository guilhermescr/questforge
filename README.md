# 📘 QuestForge

**QuestForge** is a modern quiz-creation application that allows users to build questionnaires with **open-ended and multiple-choice questions (A–E)**, configure correction behavior, and generate a **shareable public link** for others to answer.

---

## 🚀 Key Features

### 🧩 1. Question Builder

Choose between:

- **Open-ended question**
- **Multiple-choice question** (options A–E)

Define:

- Prompt
- Correct answer
- Optional explanation
- Choice options (for MCQs)

---

### ⚙️ 2. Quiz Settings

The quiz creator can configure:

- Total number of questions
- Answer-checking mode:
  - **Immediate** → show correctness right after answering
  - **On-submit** → grade only when the quiz is submitted
- Quiz title
- Auto-generated slug (public identifier)

---

### 🔗 3. Shareable Quiz Link (no custom backend needed!)

After saving to **Supabase**, the app automatically generates:

```
https://yourapp.com/quiz/{slug}
```

Anyone with the link can:

- Take the quiz
- Receive results depending on the creator’s settings

---

### 📝 4. Response System

When a user answers the quiz:

- The frontend stores responses in the `quiz_responses` table
- The user sees their results immediately (or only after submission)
- Responses remain available in Supabase (optional)

---

### 🧪 5. Built for Testing

The project is designed so testing is effortless:

- Pure logic functions (easy to test)
- UI component tests (forms, flows, lists)
- Supabase API mocking
- Full quiz submission flow testing

---

## 🏗️ Architecture Overview

### Frontend (Next.js)

```
/src
  /components
  /app
    /create
    /quiz/[slug]
  /lib
    supabaseClient.js
    quizLogic.js (pure functions for testing)
```

### Supabase (no backend required)

#### Table: quizzes

| Field      | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| id         | uuid      | Primary key                              |
| slug       | text      | Public quiz identifier                   |
| title      | text      | Quiz name                                |
| settings   | jsonb     | immediate/on-submit, number of questions |
| questions  | jsonb     | full question set                        |
| created_at | timestamp | auto                                     |

#### Table: quiz_responses

| Field      | Type      | Description   |
| ---------- | --------- | ------------- |
| id         | uuid      | Primary key   |
| quiz_id    | uuid      | FK to quizzes |
| answers    | jsonb     | user answers  |
| score      | numeric   | final score   |
| created_at | timestamp | auto          |

### Suggested RLS Rules

**quizzes:**

- SELECT → public
- INSERT → public
- UPDATE → owner only (if auth is added later)

**quiz_responses:**

- INSERT → public
- SELECT → private (optional)

---

## 🔌 Application Flow

1. Creator builds a quiz
2. Frontend saves quiz in Supabase
3. Supabase returns a `slug`
4. Creator shares the link `/quiz/{slug}`
5. User answers questions
6. Frontend posts responses to Supabase
7. Results displayed according to quiz settings

---

## 🧠 Answer Checking Modes

### 🔵 Immediate Mode

For each question:

- User answers
- The system instantly shows correct/incorrect
- Optional explanation shown
- Moves to next question

### 🟢 On-Submit Mode

- User completes all questions
- Submits quiz
- Score and full answer key shown at the end

---

## 📦 Tech Stack

- **React / Next.js**
- **Supabase** (Postgres + REST API + RLS)
- **Tailwind / shadcn/ui** (optional)
- **Vitest / React Testing Library** (recommended)
- **Zustand or Context API** (state management)

---

## 🧪 Testing Coverage Recommendations

### 1. Pure Logic Tests (Unit Tests)

- Validate question structure
- Correct open-ended answers
- Correct MCQ answers
- Score calculation
- Answer-checking mode logic

### 2. UI Tests

- Add and edit questions
- Switch open/closed types
- Fill in alternatives
- Quiz preview
- Load quiz by slug
- Submit quiz

### 3. API Mock Tests

- GET quiz by slug
- POST response
- Failure scenarios

---

## 🛠️ Installation

```
git clone https://github.com/yourusername/questforge
cd questforge
npm install
```

Create a `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Run the dev server:

```
npm run dev
```

---

## 🌐 Deployment

Recommended:

- **Vercel**
- Connect Supabase environment variables

---

## 🧭 Future Improvements

- 🔒 Creator authentication (optional)
- 📊 Results dashboard
- 🎨 Quiz theming
- 🔄 Duplicate questions
- 📤 Export quizzes as PDF
- 📥 Import quizzes from JSON

---

## 🤝 Contributing

Pull requests and suggestions are welcome!

---

## 📜 License

MIT License
