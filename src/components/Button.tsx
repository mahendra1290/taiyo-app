import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => {
  let variantClasses = 'bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600';

  if (variant === 'secondary') {
    variantClasses = 'bg-gray-500 px-4 py-2 rounded-md text-white hover:bg-gray-600';
  }
  if (variant === 'danger') {
    variantClasses = 'bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600';
  }

  return (
    <button className={twMerge(variantClasses, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
