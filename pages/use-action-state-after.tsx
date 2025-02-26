import { useActionState } from 'react'

async function submitFeedback(prevState: unknown, formData: FormData) {
  const message = formData.get('feedback')
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate server delay
  return `Received: ${message}`
}

function FeedbackForm() {
  const [feedback, formAction, isPending] = useActionState(submitFeedback, '')

  return (
    <form
      action={formAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px'
      }}
    >
      <textarea name='feedback' placeholder='Your feedback' />
      <button type='submit'>Submit</button>
      {isPending && <p>Submitting...</p>}
      {!isPending && <p>{feedback}</p>}
    </form>
  )
}

export default function Page() {
  return (
    <div>
      <FeedbackForm />
    </div>
  )
}
