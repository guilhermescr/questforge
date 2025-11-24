interface ErrorMessageProps {
  error?: { message?: string };
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error?.message) return null;

  return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
}
