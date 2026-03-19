import PostingPlatform from "./pages/PostingPlatform";

// ── App.jsx — Root Component ─────────────────────────────────
// Abhi sirf PostingPlatform render kar raha hai
// Baad mein agar multiple pages aaye toh routing yahan add hogi
// Example: React Router ke saath <Routes> yahan aayenge

export default function App() {
  return <PostingPlatform />;
}