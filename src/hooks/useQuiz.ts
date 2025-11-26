import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabaseClient';
import { QuizDTO } from '@/src/types/quiz.dto';
import { toast } from 'sonner';

export function useQuiz(slug: string | undefined, createdBy?: string) {
  const [quiz, setQuiz] = useState<QuizDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchQuiz = async () => {
      try {
        const query = supabase.from('quizzes').select('*').eq('id', slug);

        if (createdBy) {
          query.eq('created_by', createdBy);
        }

        const { data, error } = await query.single();

        if (error || !data) {
          console.error('Error fetching quiz:', error);
          setNotFound(true);
          toast.error('Quiz not found.');
        } else {
          setQuiz(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching quiz:', err);
        toast.error('An unexpected error occurred while fetching the quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [slug, createdBy]);

  return { quiz, loading, notFound };
}
