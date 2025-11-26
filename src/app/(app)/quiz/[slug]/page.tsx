'use client';

import {
  Eye,
  Copy,
  FileText,
  Play,
  UsersRound,
  ChartNoAxesColumn,
  CircleQuestionMark,
} from 'lucide-react';
import { useQuiz } from '@/src/hooks/useQuiz';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import Loading from '@/src/components/loading/Loading';
import { formatDate, formatDateTime } from '@/src/utils/dateUtils';
import Link from 'next/link';
import routes from '@/src/lib/routes';

export default function ViewQuizPage() {
  const { slug } = useParams();
  const { quiz, loading, notFound } = useQuiz(slug as string);

  const handleCopyLink = () => {
    if (quiz) {
      const quizLink = `${window.location.origin}/quiz/${quiz.id}/answer`;
      navigator.clipboard.writeText(quizLink);
      toast.success('Quiz link copied to clipboard!');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (notFound || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-white text-4xl font-bold mb-3">Quiz Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The quiz you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <header>
        <p className="text-muted-foreground flex items-center gap-2 mb-1">
          <Eye size={16} /> Owner View
        </p>

        <h2 className="text-white text-4xl font-bold mb-3">{quiz.title}</h2>
        <p className="text-muted-foreground">
          {quiz.questions.length} questions &bull; Created{' '}
          {formatDate(quiz.created_at)}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card rounded-md p-6">
          <p className="text-muted-foreground">Total Submissions</p>

          <div className="flex items-center gap-2 mt-2">
            <UsersRound size={24} />

            <span className="text-xl font-bold">
              {quiz.total_submissions || 0}
            </span>
          </div>
        </div>

        <div className="bg-card rounded-md p-6">
          <p className="text-muted-foreground">Average Score</p>

          <div className="flex items-center gap-2 mt-2">
            <ChartNoAxesColumn size={24} />

            <span className="text-xl font-bold">
              {quiz.average_score
                ? `${(quiz.average_score * 100).toFixed(2)}%`
                : '0%'}
            </span>
          </div>
        </div>

        <div className="bg-card rounded-md p-6">
          <p className="text-muted-foreground">Questions</p>

          <div className="flex items-center gap-2 mt-2">
            <CircleQuestionMark size={24} />
            <span className="text-xl font-bold">{quiz.questions.length}</span>
          </div>
        </div>
      </section>

      <section className="flex gap-4 mt-6">
        <Button asChild>
          <Link
            href={routes.quiz.answer(quiz.id)}
            target="_blank"
            rel="noreferrer"
          >
            <Play className="mr-2" size={16} />
            Preview Quiz
          </Link>
        </Button>

        <Button onClick={handleCopyLink}>
          <Copy className="mr-2" size={16} />
          Copy Link
        </Button>
      </section>

      <section className="mt-8">
        <header className="flex items-center gap-2 mb-4">
          <FileText size={20} />
          <h3 className="text-white text-xl font-bold">Recent Submissions</h3>
        </header>

        {quiz.recent_submissions && quiz.recent_submissions.length > 0 ? (
          <>
            <p className="text-muted-foreground">
              {quiz.recent_submissions.length} submissions
            </p>

            <div className="mt-4 space-y-4">
              {quiz.recent_submissions.map((submission, index) => (
                <div
                  key={index}
                  className="bg-card rounded-md p-4 flex justify-between items-center"
                >
                  <span>{formatDateTime(submission.date)}</span>

                  <span>
                    {submission.score}/{quiz.questions.length} (
                    {submission.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground mt-4">
            No submissions yet. Encourage participants to take the quiz!
          </p>
        )}
      </section>
    </>
  );
}
