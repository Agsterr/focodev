import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 hover:scale-105',
  {
    variants: {
      variant: {
        default: 'bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand shadow-lg hover:shadow-xl',
        outline: 'border-2 border-gray-300 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:border-white/15 dark:hover:bg-white/5 hover:border-brand dark:hover:border-neon-violet/60',
        ghost: 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
        gradient: 'bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink bg-[length:200%_auto] bg-left hover:bg-right text-white shadow-neon focus-visible:ring-neon-violet transition-[background-position,transform,box-shadow] duration-500',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
