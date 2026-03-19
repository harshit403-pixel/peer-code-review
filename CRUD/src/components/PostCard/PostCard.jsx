import { useState } from "react";
import styles from "./PostCard.module.css";
import { formatTimestamp } from "../../utils/formatTimestamp";

// ── PostCard Component ───────────────────────────────────────
// Har ek post ko yeh card display karega
// Props: postData (object), onEditClick (fn), onDeleteClick (fn)

export default function PostCard({ postData, onEditClick, onDeleteClick }) {
  const { id, title, content, author, createdAt, editedAt } = postData;

  // Delete press hone par seedha delete mat karo — pehle confirm lo
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  function handleDeleteRequest() {
    setIsDeleteConfirmVisible(true);
  }

  function handleDeleteConfirm() {
    // Parent (PostingPlatform) ko id bhejo taaki woh state update kare
    onDeleteClick(id);
  }

  function handleDeleteCancel() {
    setIsDeleteConfirmVisible(false);
  }

  return (
    <article className={styles.postCard}>
      {/* ── Card Header: avatar, name, time, action buttons ── */}
      <div className={styles.header}>
        <div className={styles.avatar}>
          {/* Author ke naam ka pehla letter avatar ke roop mein */}
          {author.charAt(0).toUpperCase()}
        </div>

        <div className={styles.meta}>
          <span className={styles.author}>{author}</span>
          <span className={styles.time}>
            {formatTimestamp(createdAt)}
            {/* editedAt truthy hai tabhi "(edited)" badge dikhao */}
            {editedAt && <em className={styles.editedBadge}> · edited</em>}
          </span>
        </div>

        {/* Edit aur Delete ke icon buttons */}
        <div className={styles.actions}>
          <button
            className="btn btn--icon"
            onClick={() => onEditClick(postData)} // Poora postData bhejo taaki form pre-fill ho sake
            title="Edit post"
          >
            <i class="ri-edit-2-fill"></i>
          </button>
          <button
            className="btn btn--icon"
            onClick={handleDeleteRequest}
            title="Delete post"
          >
            <i class="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </div>

      {/* ── Post ka actual content ── */}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>

      {/* ── Confirmation banner — sirf tab render hoga jab delete click ho ── */}
      {isDeleteConfirmVisible && (
        <div className={styles.confirmDelete}>
          <span>Are you sure you want to delete this post?</span>
          <div className={styles.confirmActions}>
            <button className="btn btn--danger-sm" onClick={handleDeleteConfirm}>
              Yes, Delete
            </button>
            <button className="btn btn--ghost-sm" onClick={handleDeleteCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}