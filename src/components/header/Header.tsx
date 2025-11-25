import Link from 'next/link';
import GradientText from '../gradientText/GradientText';
import Wrapper from '../wrapper/Wrapper';
import styles from './header.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/DropdownMenu';
import { User, LogOut, Flame } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabaseClient';
import routes from '@/src/lib/routes';
import { Button } from '../ui/Button';
import { useUserContext } from '@/src/context/UserContext';

export default function Header() {
  const router = useRouter();
  const { user } = useUserContext();

  if (!user) return null;

  async function logout() {
    await supabase.auth.signOut();
    router.push(routes.auth);
  }

  return (
    <header className="w-full py-4 bg-card border-b border-border sticky top-0 z-10">
      <Wrapper className="flex items-center justify-start">
        <h1 className="font-bold flex items-center gap-2">
          <Flame className="text-primary" />
          <GradientText className="text-2xl">QuestForge</GradientText>
        </h1>

        <nav className="ml-6">
          <ul className="pt-1">
            <li>
              <Link href={routes.dashboard} className={styles.navLink}>
                My Quizzes
              </Link>
            </li>
          </ul>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto">
              <User size={18} className="mr-1" />
              {user.user_metadata.full_name}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1 py-1.5 px-2">
                <p className="text-sm font-medium leading-none">
                  {user.user_metadata.full_name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Wrapper>
    </header>
  );
}
