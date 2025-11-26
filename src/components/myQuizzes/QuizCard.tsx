'use client';

import { QuizDTO } from '@/src/types/quiz.dto';
import { formatDate } from '@/src/utils/dateUtils';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { toast } from 'sonner';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import { useState } from 'react';
import routes from '@/src/lib/routes';
import { Clock, Pencil, Share2, MoreVertical, Trash2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/DropdownMenu';

interface QuizCardProps {
  quiz: QuizDTO;
  onDelete: (quizId: string) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = () => {
    const quizLink = `${window.location.origin}/quiz/${quiz.id}`;
    navigator.clipboard.writeText(quizLink);
    toast.success('Quiz link copied to clipboard!');
  };

  const deleteQuiz = async () => {
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quiz.id);

      if (error) {
        throw new Error(error.message);
      }

      onDelete(quiz.id);

      toast.success('Quiz deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete quiz!');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <section className="p-5 rounded-md bg-card border border-border hover:border-primary transition-colors relative">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={routes.quiz.edit(quiz.id)}>
                  <Pencil size={18} className="mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 size={18} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href={routes.quiz.view(quiz.id)}>
          <div className="cursor-pointer">
            <h3 className="font-semibold text-white text-xl pr-6">
              {quiz.title}
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              {quiz.questions.length}{' '}
              {quiz.questions.length === 1 ? 'question' : 'questions'} &bull;{' '}
              {quiz.attempts} {quiz.attempts === 1 ? 'attempt' : 'attempts'}
            </p>

            <p className="text-sm text-muted-foreground mt-2">
              Answer Checking:{' '}
              {quiz.answer_checking_mode === 'immediate'
                ? 'Immediate'
                : 'On Completion'}
            </p>

            <p className="text-sm text-muted-foreground my-4 flex items-center gap-2">
              <Clock size={18} /> Created {formatDate(quiz.created_at)}
            </p>
          </div>
        </Link>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleCopyLink();
          }}
        >
          <Share2 size={18} /> Share
        </Button>
      </section>

      <DeleteDialog
        isOpen={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onDelete={deleteQuiz}
        isDeleting={isDeleting}
        title="Delete Quiz?"
        description="This will permanently delete the quiz and all its data. Are you sure?"
      />
    </>
  );
}
