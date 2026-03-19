import { useState } from "react";

// ── usePosts: Custom Hook ────────────────────────────────────
// Saara posts ka logic — create, edit, delete — yahan centralized hai
// Page component (PostingPlatform) ko sirf yeh hook use karna hai, logic nahi likhna

// Kuch sample posts taaki platform start mein khali na lage
const INITIAL_POSTS = [
  {
    id: Date.now() - 3000,
    title: "Started Learning React!",
    content:
      "Today I used the useState hook for the first time. Components are starting to make sense now. Slowly but surely getting the hang of it!",
    author: "Arjun Sharma",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    editedAt: null,
  },
  {
    id: Date.now() - 2000,
    title: "My First Code Review Experience",
    content:
      "Had my code reviewed today. Was a bit nervous but my teammates gave really constructive feedback. Learned so much from the session!",
    author: "Priya Mehta",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    editedAt: null,
  },
];

export function usePosts() {
  // allPosts mein saari posts ka array store hai
  const [allPosts, setAllPosts] = useState(INITIAL_POSTS);

  // ── Naya post create karna ───────────────────────────────────
  function createPost(newPostFormData) {
    const newPost = {
      id: Date.now(), // Simple unique ID — production mein crypto.randomUUID() better hai
      title: newPostFormData.title.trim(),
      content: newPostFormData.content.trim(),
      author: newPostFormData.author.trim(),
      createdAt: new Date().toISOString(),
      editedAt: null, // Abhi edit nahi hua, isliye null
    };

    // Nayi post ko array ke shuru mein add karo (newest first order)
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  // ── Existing post update karna ───────────────────────────────
  function editPost(postIdToEdit, updatedFormData) {
    setAllPosts((prevPosts) =>
      prevPosts.map((existingPost) => {
        // Sirf matching ID wali post ko update karo, baaki same rahe
        if (existingPost.id === postIdToEdit) {
          return {
            ...existingPost,        // Purana data spread karo
            title: updatedFormData.title.trim(),
            content: updatedFormData.content.trim(),
            author: updatedFormData.author.trim(),
            editedAt: new Date().toISOString(), // Edit timestamp save karo
          };
        }
        return existingPost;
      })
    );
  }

  // ── Post delete karna ────────────────────────────────────────
  function deletePost(postIdToDelete) {
    // Filter se sirf wahi posts rakho jinki id match nahi karti
    setAllPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postIdToDelete)
    );
  }

  // Hook se state aur functions dono return karo
  return { allPosts, createPost, editPost, deletePost };
}