import { ReactNode } from "react";
import { theme } from "../../styles/theme";

type CardProps = {
  children: ReactNode;
  onClick?: () => void;
};

function Card({ children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = theme.colors.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = theme.colors.border;
      }}
    >
      {children}
    </div>
  );
}

export default Card;