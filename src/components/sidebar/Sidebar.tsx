import Link from 'next/link';
import { Button } from '../ui/Button';
import { LogOut } from 'lucide-react';
import routes from '@/src/lib/routes';

interface SidebarProps {
  logout: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ logout, setIsSidebarOpen }: SidebarProps) {
  return (
    <nav className="md:hidden bg-card border-t border-border mt-4 pt-2 px-4">
      <ul className="flex flex-col gap-2 items-center">
        <li className="w-full">
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => setIsSidebarOpen(false)}
            asChild
          >
            <Link href={routes.dashboard}>My Quizzes</Link>
          </Button>
        </li>

        <li className="w-full">
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
          >
            <LogOut className="mr-2" size={16} />
            Sign out
          </Button>
        </li>
      </ul>
    </nav>
  );
}
