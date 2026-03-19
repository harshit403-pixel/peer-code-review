// ── Utility: ISO string ko human-readable time mein convert karna ──
// Yeh function pure utility hai — kisi component se tightly coupled nahi hai
// Isliye alag utils folder mein rakha hai

export function formatTimestamp(isoString) {
  const postDate = new Date(isoString);
  const now = new Date();

  // Milliseconds ko minutes mein convert karo
  const diffInMinutes = Math.floor((now - postDate) / 60000);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}