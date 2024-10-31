import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verify-email')({
  component: () => <div>Hello /verify-email!</div>
})