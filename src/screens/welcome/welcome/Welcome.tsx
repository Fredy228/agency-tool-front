import { type NextPage } from "next";
import WelcomeCreate from "@/components/ui/welcome/welcome-create/WelcomeCreate";
import WelcomeEdit from "@/components/ui/welcome/welcome-edit/WelcomeEdit";

const Welcome: NextPage = () => {
  return (
    <div>
      <WelcomeCreate />
      <WelcomeEdit />
    </div>
  );
};

export default Welcome;
