import Card from "../Card/Card";
import { theme } from "../../styles/theme";

type MenuItemProps = {
  emoji: string;
  title: string;
  description: string;
};

function MenuItem({ emoji, title, description }: MenuItemProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              color: theme.colors.text,
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {emoji} {title}
          </h3>

          <p
            style={{
              marginTop: theme.spacing.sm,
              marginBottom: 0,
              color: theme.colors.textSecondary,
              fontSize: 13,
              lineHeight: 1.5,
              maxWidth: 230,
            }}
          >
            {description}
          </p>
        </div>

        <span
          style={{
            color: theme.colors.primary,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          →
        </span>
      </div>
    </Card>
  );
}

export default MenuItem;