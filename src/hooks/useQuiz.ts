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

        const { data: quizData, error: quizError } = await query.single();

        if (quizError || !quizData) {
          console.error('Error fetching quiz:', quizError);
          setNotFound(true);
          toast.error('Quiz not found.');
          setLoading(false);
          return;
        }

        const { data: submissionData, error: submissionError } = await supabase
          .from('responses')
          .select('score, submitted_at')
          .eq('quiz_id', slug)
          .order('submitted_at', { ascending: false })
          .limit(10);

        if (submissionError) {
          console.error('Error fetching submissions:', submissionError);
        }

        const recentSubmissions =
          submissionData?.map((s) => ({
            date: s.submitted_at,
            score: Math.round(s.score * quizData.questions.length),
            percentage: Math.round(s.score * 100),
          })) ?? [];

        setQuiz({
          ...quizData,
          recent_submissions: recentSubmissions,
        });
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
