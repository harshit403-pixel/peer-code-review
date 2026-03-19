# PostHub — React Posting Platform

A clean, fully functional posting platform built with React. Users can create, edit, delete, and search through posts — all with a smooth UI and proper component architecture.

> Built as part of a **Peer Code Review** exercise to practice real-world React patterns like custom hooks, CSS Modules, and folder-based component structure.

---

## Live Preview

[![Screenshot-2026-03-20-021306.png](https://i.postimg.cc/zv8Xc8Rv/Screenshot-2026-03-20-021306.png)](https://postimg.cc/xJp2kr5V)

---

## Features

- **Create** a new post with title, content, and author name
- **Edit** any existing post — form pre-fills with current data
- **Delete** a post with a confirmation step (no accidental deletions)
- **Search** across title, content, and author in real time
- **Relative timestamps** — shows "2h ago", "Just now", etc.
- **Form validation** — all fields required before submitting
- **Responsive** — works on mobile and desktop

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| CSS Modules | Component-scoped styling |
| Custom Hooks | Separating logic from UI |

No external UI libraries — everything is built from scratch.

---

## Folder Structure

```
posting-platform/
├── public/
│   └── index.html              # Root HTML file
│
├── src/
│   ├── components/
│   │   ├── PostCard/
│   │   │   ├── PostCard.jsx            # Single post card UI
│   │   │   └── PostCard.module.css     # PostCard styles
│   │   │
│   │   └── PostForm/
│   │       ├── PostForm.jsx            # Create & Edit form modal
│   │       └── PostForm.module.css     # PostForm styles
│   │
│   ├── hooks/
│   │   └── usePosts.js         # All CRUD logic lives here
│   │
│   ├── pages/
│   │   └── PostingPlatform.jsx # Main page — renders feed + controls
│   │
│   ├── utils/
│   │   └── formatTimestamp.js  # Converts ISO date → "2h ago"
│   │
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point (ReactDOM)
│   └── index.css               # Global styles & CSS variables
│
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/posting-platform.git
cd posting-platform
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts local dev server with hot reload |
| `npm run build` | Creates production-ready build in `/dist` |
| `npm run preview` | Preview the production build locally |

---

## Architecture Decisions

### Why Custom Hook (`usePosts`)?
All CRUD logic — create, edit, delete — lives in `src/hooks/usePosts.js` instead of directly in the page component. This means:
- The page component only handles UI rendering
- Logic can be reused in other pages if needed
- Easier to test in isolation

### Why CSS Modules?
Each component has its own `.module.css` file. This prevents class name conflicts and keeps styles scoped to their component. Global styles (buttons, layout, CSS variables) live in `index.css`.

### Why `pages/` folder?
`PostingPlatform.jsx` is a **page**, not a reusable component — it manages state and composes smaller components together. Separating pages from components makes it easy to add routing later (e.g. React Router).

---

## Component Overview

### `PostCard`
Displays a single post. Has its own internal state for the delete confirmation banner — so confirming a delete doesn't affect any other part of the app.

**Props:**
| Prop | Type | Description |
|---|---|---|
| `postData` | `object` | The post object (id, title, content, author, etc.) |
| `onEditClick` | `function` | Called when edit button is clicked |
| `onDeleteClick` | `function` | Called with post `id` when delete is confirmed |

### `PostForm`
Handles both **create** and **edit** modes in a single component. If `initialFormValues` is passed, it enters edit mode and pre-fills the form.

**Props:**
| Prop | Type | Description |
|---|---|---|
| `initialFormValues` | `object \| null` | `null` = create mode, object = edit mode |
| `onFormSubmit` | `function` | Called with form data on valid submit |
| `onFormCancel` | `function` | Called when modal is closed |

### `usePosts` (Custom Hook)
Returns post state and three functions to modify it.

```js
const { allPosts, createPost, editPost, deletePost } = usePosts();
```

### `formatTimestamp`
Pure utility function. Takes an ISO date string, returns a human-readable relative time string.

```js
formatTimestamp("2024-01-15T10:00:00.000Z") // → "3h ago"
```

---

## Peer Code Review Notes

This project was built as part of a code review exercise. Here's what was intentionally practiced:

**Good Practices Used:**
- Meaningful variable names (`postBeingEdited`, `isDeleteConfirmVisible`, `filteredPosts`)
- Single source of truth — all post state in one place
- Controlled form inputs — `value` + `onChange` on every field
- Separation of concerns — logic, UI, and utilities are all in separate files

**Known Limitations:**
- `Date.now()` used for IDs — `crypto.randomUUID()` would be safer in production
- No persistence — page refresh clears all posts (no localStorage or backend)
- No loading/error states — assumes all operations succeed

**Future Improvements:**
- Add `localStorage` so posts persist after refresh
- Add `useReducer` to replace multiple `useState` calls in the page
- Add React Router for multiple pages
- Add a `ConfirmDialog` component to reuse delete confirmation elsewhere

---

## License

MIT — free to use and modify.

---

## Acknowledgements

- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Built during a peer code review session
