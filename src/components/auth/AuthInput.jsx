/*import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function AuthInput({
  type,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  ...props
}) {
  const getIcon = () => {
    switch (type) {
      case "email":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      case "password":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#8E9196]">
        {getIcon()}
      </div>
      <Input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={props.placeholder || type.charAt(0).toUpperCase() + type.slice(1)}
        value={value}
        onChange={onChange}
        className="pl-10 pr-10 bg-white/30 h-11 border-[#E5DEFF] focus-visible:ring-[#9b87f5] transition-colors"
        {...props}
      />
      {type === "password" && toggleShowPassword && (
        <button
          type="button"
          className="absolute right-3 flex items-center justify-center text-[#8E9196] hover:text-[#9b87f5] transition-colors"
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
}*/
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export const AuthInput = forwardRef(
  ({ type, value, onChange, showPassword, toggleShowPassword, ...props }, ref) => {
    const getIcon = () => {
      switch (type) {
        case "email":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
              
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          );
        case "password":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          );
      }
    };

    return (
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#8E9196]">
          {getIcon()}
        </div>
        <Input
          ref={ref} // Pass ref properly
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={props.placeholder || type.charAt(0).toUpperCase() + type.slice(1)}
          value={value}
          onChange={onChange}
          className="pl-10 pr-10 bg-white/30 h-11 border-[#E5DEFF] focus-visible:ring-[#9b87f5] transition-colors"
          {...props}
        />
        {type === "password" && toggleShowPassword && (
          <button
            type="button"
            className="absolute right-3 flex items-center justify-center text-[#8E9196] hover:text-[#9b87f5] transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    );
  }
);

// Important for React DevTools and Debugging
AuthInput.displayName = "AuthInput";
