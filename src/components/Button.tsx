import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => {
  let variantClasses = 'bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600';

  if (variant === 'secondary') {
    variantClasses = 'bg-gray-500 px-4 py-2 rounded-md text-white hover:bg-gray-600';
  }

  if (variant === 'danger') {
    variantClasses = 'bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600';
  }

  if (variant === 'outline') {
    variantClasses =
      'bg-transparent border-2 border-blue-500 px-4 py-2 rounded-md text-blue-500 hover:border-blue-800 hover:text-blue-800';
  }

  if (variant === 'link') {
    variantClasses = 'bg-transparent px-4 py-2 rounded-md text-blue-500 hover:text-blue-800';
  }

  return (
    <button className={twMerge(variantClasses, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
