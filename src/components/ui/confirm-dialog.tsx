// Dialog.tsx
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Button } from './button';
import { XIcon } from 'lucide-react';
const DialogVariants = cva('native-dialog border p-4 w-full sm:w-fit', {
  variants: {
    variant: {
      default: '',
      small: 'w-full max-w-sm',
      medium: 'w-full max-w-md',
      large: 'w-full max-w-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface DialogProps {
  title: string;
  details: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

// const ConfirmDialog: React.FC<DialogProps> = ({ title, details, onClose }) => {
//   return (
//     <dialog open>
//       <h2>{title}</h2>
//       <p>{details}</p>
//       <button onClick={onClose}>Close</button>
//     </dialog>
//   );
// };

const ConfirmDialog = React.forwardRef<
  HTMLDialogElement,
  React.ComponentPropsWithRef<'dialog'> &
    VariantProps<typeof DialogVariants> &
    DialogProps
>(
  (
    { open, onClose, onConfirm, className, variant, title, details, ...props },
    _ref
  ) => {
    const ref = React.useRef<HTMLDialogElement>(null);
    React.useEffect(() => {
      if (open) {
        // Only show modal if not already displayed
        if (ref.current) {
          ref.current.showModal(); // Show modal
          ref.current.style.transform = 'translateY(0px)';
          ref.current.style.scale = '1';
          ref.current.style.opacity = '1';
        }
      } else {
        if (ref.current) {
          ref.current.close(); // Close modal if not open
          ref.current.style.transform = 'translateY(130px)';
          ref.current.style.scale = '0.5';
          ref.current.style.opacity = '0';
        }
      }
    }, [open]);

    return (
      <dialog
        ref={ref}
        onClose={onClose}
        className={DialogVariants({ variant, className })}
        {...props}
      >
        <header className='dialog-header flex justify-between items-center mb-4'>
          {title && <div className='dialog-title font-bold'>{title}</div>}
          <Button
            variant='outline'
            onClick={onClose}
            type='button'
            className='dialog-close'
          >
            <XIcon className='dialog-close-icon' />
          </Button>
        </header>

        {details && <div className='dialog-details my-4'>{details}</div>}
        <footer className='flex items-center gap-2 justify-between'>
          <Button variant={'outline'} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </footer>
      </dialog>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
