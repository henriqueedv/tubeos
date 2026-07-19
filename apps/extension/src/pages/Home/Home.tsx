import Header from "../../components/Header/Header";
import MenuItem from "../../components/MenuItem/MenuItem";

function Home() {
  return (
    <main
      style={{
        width: 360,
        minHeight: 500,
        background: "#0F172A",
        padding: 20,
      }}
    >
      <Header
        title="🚀 TubeOS"
        subtitle="The operating system for YouTube"
      />

      <MenuItem
        emoji="📝"
        title="Smart Notes"
        description="Create notes while watching videos."
      />

      <MenuItem
        emoji="🎯"
        title="Focus Mode"
        description="Remove distractions from YouTube."
      />

      <MenuItem
        emoji="📚"
        title="Dashboard"
        description="Access your study history."
      />

      <MenuItem
        emoji="⚙️"
        title="Settings"
        description="Customize your experience."
      />
    </main>
  );
}

export default Home;