import React from 'react';

function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  type = 'button',
}) {
  const baseStyles =
    'px-6 py-2 rounded-md font-semibold transition-colors duration-200 ease-in-out';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 shadow-md',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 shadow-md',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabled ? disabledStyles : ''}
        focus:outline-none focus:ring-opacity-75
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
