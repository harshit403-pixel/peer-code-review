import { useState } from "react";
import styles from "./PostForm.module.css";

// ── PostForm Component ───────────────────────────────────────
// Create aur Edit — dono kaam yahi component karta hai
// initialFormValues null ho toh "create mode", value ho toh "edit mode"

const EMPTY_FORM_STATE = { title: "", content: "", author: "" };

export default function PostForm({ initialFormValues, onFormSubmit, onFormCancel }) {
  // formValues ek single state object mein saare fields manage karta hai
  const [formValues, setFormValues] = useState(
    initialFormValues || EMPTY_FORM_STATE
  );

  // Ek hi handler saare inputs ke liye — name attribute se field identify hoti hai
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Computed property key — dynamically sahi field update hogi
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // Default form submission (page reload) rokna

    // Validation — koi bhi field blank nahi honi chahiye
    const isTitleEmpty   = formValues.title.trim()   === "";
    const isContentEmpty = formValues.content.trim() === "";
    const isAuthorEmpty  = formValues.author.trim()  === "";

    if (isTitleEmpty || isContentEmpty || isAuthorEmpty) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    onFormSubmit(formValues); // Validated data parent ko pass karo
    setFormValues(EMPTY_FORM_STATE); // Submit ke baad form saaf karo
  }

  // !! se boolean banana — initialFormValues exist karta hai toh edit mode
  const isEditMode = !!initialFormValues;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* ── Modal ka top header bar ── */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h2>
          <button className={`btn btn--close ${styles.closeBtn}`} onClick={onFormCancel}>
            ✕
          </button>
        </div>

        {/* ── Form body — teen fields: author, title, content ── */}
        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Author field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="author">
              Your Name 
            </label>
            <input
              id="author"
              name="author"
              type="text"
              className={styles.input}
              placeholder="e.g. Rahul Kumar"
              value={formValues.author}
              onChange={handleInputChange}
              maxLength={40}
            />
          </div>

          {/* Title field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">
              Post Title 
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.input}
              placeholder="Write a catchy heading..."
              value={formValues.title}
              onChange={handleInputChange}
              maxLength={80}
            />
            {/* Live character count — user ko pata chale kitna space bacha hai */}
            <span className={styles.charCount}>{formValues.title.length}/80</span>
          </div>

          {/* Content textarea */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="content">
              What's on your mind? 
            </label>
            <textarea
              id="content"
              name="content"
              className={styles.textarea}
              placeholder="Share your thoughts here..."
              value={formValues.content}
              onChange={handleInputChange}
              rows={5}
              maxLength={500}
            />
            <span className={styles.charCount}>{formValues.content.length}/500</span>
          </div>

          {/* Submit aur Cancel buttons */}
          <div className={styles.formActions}>
            <button type="submit" className="btn btn--primary">
              {isEditMode ? "💾 Save Changes" : "🚀 Publish Post"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={onFormCancel}>
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}