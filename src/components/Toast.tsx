import React, { useEffect } from "react";

export type AlertType =
  | "success"
  | "error"
  | "warning"
  | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose?: () => void;
  duration?: number;
}

const Toast: React.FC<AlertProps> = ({
  type = "success",
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons: Record<AlertType, string> = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <>
      <style>
        {`
          .alert {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 320px;
            max-width: 400px;
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px;
            border-radius: 18px;
            color: white;
            animation: slideIn 0.3s ease;
            z-index: 9999;
          }

          .alert-icon {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 20px;
            font-weight: bold;
          }

          .alert-close {
            margin-left: auto;
            background: transparent;
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
          }

          .alert-success {
            background: #16a34a;
          }

          .alert-error {
            background: #dc2626;
          }

          .alert-warning {
            background: #d97706;
          }

          .alert-info {
            background: #2563eb;
          }

          .alert-success .alert-icon {
            background: #15803d;
          }

          .alert-error .alert-icon {
            background: #b91c1c;
          }

          .alert-warning .alert-icon {
            background: #b45309;
          }

          .alert-info .alert-icon {
            background: #1d4ed8;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }

            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div className={`alert alert-${type}`}>
        <div className="alert-icon">
          {icons[type]}
        </div>

        <div>
          <strong>
            {type.toUpperCase()}
          </strong>
          <div>{message}</div>
        </div>

        <button
          className="alert-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </>
  );
};

export default Toast;