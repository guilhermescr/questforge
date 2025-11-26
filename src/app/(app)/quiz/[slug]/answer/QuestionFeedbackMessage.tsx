interface QuestionFeedbackMessageProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}

export default function QuestionFeedbackMessage({
  isCorrect,
  correctAnswer,
  explanation,
}: QuestionFeedbackMessageProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
      }`}
    >
      <p
        className={`mb-2 font-semibold ${
          isCorrect ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isCorrect ? 'Correct!' : 'Incorrect'}
      </p>

      {!isCorrect && (
        <p className="mb-2 text-sm text-muted-foreground">
          Correct answer: {correctAnswer}
        </p>
      )}

      {explanation && <p className="text-sm text-foreground">{explanation}</p>}
    </div>
  );
}
