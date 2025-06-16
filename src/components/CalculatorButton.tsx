
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "default" | "secondary" | "operator";
}

export const CalculatorButton = ({ 
  children, 
  onClick, 
  className,
  variant = "default"
}: CalculatorButtonProps) => {
  const baseClasses = "h-16 text-xl font-semibold transition-all duration-150 active:scale-95 border-white/10";
  
  const variantClasses = {
    default: "bg-gray-700/50 hover:bg-gray-600/50 text-white backdrop-blur-sm",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    operator: "bg-orange-500 hover:bg-orange-400 text-white"
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      variant="ghost"
    >
      {children}
    </Button>
  );
};
