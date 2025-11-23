import Link from 'next/link';
import { Button } from '../ui/Button';
import { QuizDTO } from '@/src/types/quiz.dto';
import QuizCard from './QuizCard';
import routes from '@/src/lib/routes';

export default function MyQuizzes() {
  const cards: QuizDTO[] = [
    {
      id: '635a1f4b2f1b2c0015e8c9a1c',
      title: 'Quantos animais você conhece?',
      questions: 2,
      answerChecking: 'immediate',
      attempts: 8,
      createdAt: '2025-11-23',
    },
    {
      id: '635a1f4b2f1b2c0015e8c9a1d',
      title: 'Quantos animais você conhece?',
      questions: 2,
      answerChecking: 'on-completion',
      attempts: 8,
      createdAt: '2025-11-23',
    },
    {
      id: '635a1f4b2f1b2c0015e8c9a1e',
      title: 'Quantos animais você conhece?',
      questions: 2,
      answerChecking: 'immediate',
      attempts: 8,
      createdAt: '2025-11-23',
    },
    {
      id: '635a1f4b2f1b2c0015e8c9a1f',
      title: 'Quantos animais você conhece?',
      questions: 2,
      answerChecking: 'immediate',
      attempts: 8,
      createdAt: '2025-11-23',
    },
  ];

  if (!cards.length) {
    return (
      <section className="border border-dashed border-border rounded-md flex flex-col items-center justify-center p-8 mt-6">
        <h3 className="font-semibold text-xl text-white">No quizzes yet</h3>
        <p className="text-center text-muted-foreground mt-2">
          Get started by creating your first quiz!
        </p>

        <Button className="mt-5" asChild>
          <Link href={routes.quiz.new}>Create Your First Quiz</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </section>
  );
}
