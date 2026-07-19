import { theme } from "../../styles/theme";

type HeaderProps = {
  title: string;
  subtitle: string;
};

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header
      style={{
        marginBottom: theme.spacing.lg,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 700,
          color: theme.colors.text,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          marginTop: theme.spacing.sm,
          marginBottom: 0,
          fontSize: 14,
          lineHeight: 1.5,
          color: theme.colors.textSecondary,
        }}
      >
        {subtitle}
      </p>
    </header>
  );
}

export default Header;