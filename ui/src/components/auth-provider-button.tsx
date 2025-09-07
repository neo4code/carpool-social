import { Button } from "./ui/button"
import { useState } from "react"

interface AuthProviderButtonProps {
  provider: 'google' | 'apple' | 'facebook';
  onClick: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

// Provider-specific icons
const GoogleIcon = () => (
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const providerConfig = {
  google: {
    label: 'Continue with Google',
    icon: GoogleIcon,
    className: 'bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-900 dark:bg-white dark:hover:bg-gray-50 dark:text-gray-900 dark:hover:text-gray-900',
  },
  apple: {
    label: 'Continue with Apple',
    icon: AppleIcon,
    className: 'bg-black hover:bg-gray-800 text-white hover:text-white dark:bg-black dark:hover:bg-gray-800',
  },
  facebook: {
    label: 'Continue with Facebook',
    icon: FacebookIcon,
    className: 'bg-[#1877F2] hover:bg-[#166fe5] text-white hover:text-white',
  },
};

export function AuthProviderButton({ provider, onClick, disabled = false, className = "" }: AuthProviderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const config = providerConfig[provider];

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error(`${provider} auth error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const IconComponent = config.icon;

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full flex gap-2 items-center justify-center ${config.className} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="w-[18px] h-[18px] border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <IconComponent />
      )}
      {isLoading ? 'Signing in...' : config.label}
    </Button>
  );
}
