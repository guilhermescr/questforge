'use client';

import { QuizDTO } from '@/src/types/quiz.dto';
import { formatDate } from '@/src/utils/dateUtils';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { toast } from 'sonner';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import { useState } from 'react';
import routes from '@/src/lib/routes';
import { Clock, Eye, Pencil, Share2, Trash2 } from 'lucide-react';

interface QuizCardProps {
  quiz: QuizDTO;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = () => {
    const quizLink = `${window.location.origin}/quiz/${quiz.id}`;
    navigator.clipboard.writeText(quizLink);
    toast.success('Quiz link copied to clipboard!');
  };

  const deleteCard = async () => {
    setIsDeleting(true);

    try {
      // supabase delete logic here
      // const response = await fetch(`/api/quizzes/${quiz.id}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to delete quiz');
      // }

      // remove the card from the UI or refresh the list

      toast.success('Quiz deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete quiz');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <section className="p-5 rounded-md bg-card border border-border hover:border-primary transition-colors relative">
        <div className="absolute top-3 right-3">
          <Button
            variant="destructiveRounded"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 size={18} />
          </Button>
        </div>

        <h3 className="font-semibold text-white text-xl pr-6">{quiz.title}</h3>

        <p className="text-sm text-muted-foreground mt-2">
          {quiz.questions} {quiz.questions === 1 ? 'question' : 'questions'}{' '}
          &bull; {quiz.attempts} {quiz.attempts === 1 ? 'attempt' : 'attempts'}
        </p>

        <p className="text-sm text-muted-foreground mt-2">
          Answer Checking:{' '}
          {quiz.answerChecking === 'immediate' ? 'Immediate' : 'On Completion'}
        </p>

        <p className="text-sm text-muted-foreground my-4 flex items-center gap-2">
          <Clock size={18} /> Created {formatDate(quiz.createdAt)}
        </p>

        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" asChild>
            <Link href={routes.quiz.view(quiz.id)}>
              <Eye className="mr-1" size={18} /> View
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href={routes.quiz.edit(quiz.id)}>
              <Pencil size={18} /> Edit
            </Link>
          </Button>

          <Button variant="secondary" onClick={handleCopyLink}>
            <Share2 size={18} /> Share
          </Button>

          {/* <Button
            variant="destructiveOutline"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </Button> */}
        </div>
      </section>

      <DeleteDialog
        isOpen={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onDelete={deleteCard}
        isDeleting={isDeleting}
        title="Delete Card?"
        description="Are you sure you want to delete this card? This action cannot be undone. All comments, likes, and associated data will be permanently removed."
      />
    </>
  );
}
