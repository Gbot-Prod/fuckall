import type { ReactNode } from "react";
import { BiCalculator } from "react-icons/bi";

type SideBarIconProps = {
  icon: ReactNode;
  text: string;
};

const SideBarIcon = ({ icon, text = 'tooltip' }: SideBarIconProps) => (
  <div className="sidebarIcon group">
    {icon}

    <span className="sidebarTooltip group-hover:scale-100">
      {text}
    </span>
  </div>
)

function DiscordSideBar() {
  return (
    <div className="discordSidebar fixed top-0 left-0 w-fit h-screen
                   bg-gray-800 text-white flex flex-col 
                   rounded-tr-lg rounded-br-lg shadow-lg">
      <div className="discordSidebarHeader p-4">
        <h2>Components</h2>
      </div>
      <ul className="discordSidebarMenu align-middle flex flex-col items-center mt-4 gap-2">
        <SideBarIcon icon={<BiCalculator size="28" />} text="Calculator" />
        <SideBarIcon icon={<BiCalculator size="28" />} text="Calculator" />
        <SideBarIcon icon={<BiCalculator size="28" />} text="Calculator" />
        <SideBarIcon icon={<BiCalculator size="28" />} text="Calculator" />
        <SideBarIcon icon={<BiCalculator size="28" />} text="Calculator" />
      </ul>
    </div>
  );
}

export default DiscordSideBar;