const ToastStylesReset = () => (
  <style>
    {`
        @media only screen and (max-width: 480px) {
          .Toastify__toast-container--top-center,
          .Toastify__toast-container {
            top: var(--toastify-toast-top);
            left: 50%;
            transform: translateX(-50%);
            width: var(--toastify-toast-width);
            padding: 4px;
          }
        }
      `}
  </style>
);

export default ToastStylesReset;
