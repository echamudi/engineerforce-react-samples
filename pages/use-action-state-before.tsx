import { useState, useRef, RefObject } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const formRef: RefObject<HTMLFormElement | null> = useRef(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(formRef.current || undefined);
    const message = formData.get("feedback");

    // Simulating server delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFeedback(`Received: ${message}`);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit} 
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
      }}>
      <textarea name="feedback" placeholder="Your feedback" />
      <button type="submit">Submit</button>
      <p>{feedback}</p>
    </form>
  );
}

export default function Page() {
  return (
    <div>
      <FeedbackForm />
    </div>
  );
}
