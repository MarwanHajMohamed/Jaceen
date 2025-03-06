import { useState } from "react";
import "./animatedbutton.css";

export default function AnimatedButton({ text }: { text: string }) {
  const [rippleStyle, setRippleStyle] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Get click position relative to the button
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRippleStyle({ top: y, left: x });
    setIsRippling(true);

    // Remove ripple effect after animation
    setTimeout(() => {
      setIsRippling(false);
      setRippleStyle(null);
    }, 600);
  };

  return (
    <button className="animated-button" onClick={handleClick}>
      {text}
      {isRippling && rippleStyle && (
        <span
          className="ripple"
          style={{
            top: rippleStyle.top,
            left: rippleStyle.left,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}
