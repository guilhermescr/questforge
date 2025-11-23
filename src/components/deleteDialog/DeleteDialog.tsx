'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/Dialog';
import { Trash, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
  title?: string;
  description?: string;
}

export default function DeleteDialog({
  isOpen,
  onOpenChange,
  onDelete,
  isDeleting,
  title = 'Delete Item?',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2 mb-2">
            <Trash2 size={22} /> {title}
          </DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={20} className="h-4 w-4 animate-spin" />
            ) : (
              <Trash size={20} />
            )}{' '}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
