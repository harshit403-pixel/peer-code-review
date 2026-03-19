import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";

// ── PostingPlatform Page ─────────────────────────────────────
// Yeh "single source of truth" hai — saari UI state yahan centralized hai
// CRUD logic usePosts hook se aati hai, components sirf render karte hain

export default function PostingPlatform() {
  // usePosts hook se posts ka data aur CRUD functions lo
  const { allPosts, createPost, editPost, deletePost } = usePosts();

  // Form visible hai ya nahi — boolean se control hota hai
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Agar koi post edit ho rahi hai toh uska data yahan hoga, warna null
  const [postBeingEdited, setPostBeingEdited] = useState(null);

  // User ki search query — empty string matlab koi filter nahi
  const [searchQuery, setSearchQuery] = useState("");

  // ── Derived state: search ke basis par posts filter karna ────
  // allPosts ya searchQuery change hone par yeh automatically recalculate hoga
  const filteredPosts = allPosts.filter((post) => {
    const queryLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(queryLower) ||
      post.content.toLowerCase().includes(queryLower) ||
      post.author.toLowerCase().includes(queryLower)
    );
  });

  // ── Handler: Edit button click hone par ─────────────────────
  function handleEditButtonClick(selectedPost) {
    setPostBeingEdited(selectedPost); // Kaun si post edit ho rahi hai — track karo
    setIsFormOpen(true);
  }

  // ── Handler: Form submit — create ya edit decide karna ───────
  function handleFormSubmit(formData) {
    // postBeingEdited truthy hai toh edit, warna create
    if (postBeingEdited) {
      editPost(postBeingEdited.id, formData);
    } else {
      createPost(formData);
    }
    handleFormClose();
  }

  // ── Handler: Form band karna (cancel ya close button) ────────
  function handleFormClose() {
    setIsFormOpen(false);
    setPostBeingEdited(null); // Edit state bhi clear karo warna bug aayega
  }

  return (
    <div className="platform">
      {/* ── Sticky Header ── */}
      <header className="platform__header">
        <div className="platform__header-inner">
          <div className="platform__brand">
            <div>
              <h1 className="platform__name">PostHub</h1>
              <p className="platform__tagline">Your voice, your space</p>
            </div>
          </div>

          {/* Search input — controlled component hai, value state se aata hai */}
          <div className="search-bar">
            <span className="search-bar__icon">🔍</span>
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Clear button sirf tab dikhao jab kuch type kiya gaya ho */}
            {searchQuery && (
              <button
                className="search-bar__clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <button
            className="btn btn--primary btn--new-post"
            onClick={() => setIsFormOpen(true)}
          >
            <span>+</span> New Post
          </button>
        </div>
      </header>

      {/* ── Stats bar — filtered results ka count dikhata hai ── */}
      <div className="stats-bar">
        <span className="stats-bar__count">
          {filteredPosts.length === allPosts.length
            ? `${allPosts.length} posts`
            : `${filteredPosts.length} results for "${searchQuery}"`}
        </span>
      </div>

      {/* ── Main feed — saari posts yahan render hongi ── */}
      <main className="posts-feed">
        {filteredPosts.length === 0 ? (
          // Empty state — koi post nahi ya search result nahi mila
          <div className="empty-state">
            <div className="empty-state__icon">
              {searchQuery ? "🔍" : "📝"}
            </div>
            <h3 className="empty-state__title">
              {searchQuery ? "No posts found!" : "No posts yet!"}
            </h3>
            <p className="empty-state__subtitle">
              {searchQuery
                ? `Nothing matched "${searchQuery}". Try a different keyword.`
                : "Be the first one to share something! 🎉"}
            </p>
            {/* Search nahi ho raha tab hi yeh button dikhao */}
            {!searchQuery && (
              <button
                className="btn btn--primary"
                onClick={() => setIsFormOpen(true)}
              >
                Write First Post
              </button>
            )}
          </div>
        ) : (
          // filteredPosts array ko map karo — har post ke liye PostCard render hoga
          filteredPosts.map((post) => (
            <PostCard
              key={post.id} // React ko list efficiently update karne ke liye key chahiye
              postData={post}
              onEditClick={handleEditButtonClick}
              onDeleteClick={deletePost}
            />
          ))
        )}
      </main>

      {/* ── Modal — sirf tab render karo jab isFormOpen true ho ── */}
      {isFormOpen && (
        <PostForm
          // Edit mode mein sirf form-relevant fields pass karo (id nahi)
          initialFormValues={
            postBeingEdited
              ? {
                  title:   postBeingEdited.title,
                  content: postBeingEdited.content,
                  author:  postBeingEdited.author,
                }
              : null
          }
          onFormSubmit={handleFormSubmit}
          onFormCancel={handleFormClose}
        />
      )}
    </div>
  );
}