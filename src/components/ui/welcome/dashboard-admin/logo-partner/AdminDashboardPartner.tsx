import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./admin-dashboard-partner.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";
import UploadImage from "@/components/reused/upload-image/UploadImage";
import AdminDashboardHint from "@/components/ui/welcome/dashboard-admin/hint/AdminDashboardHint";

const textHint =
  "Here you can upload your partner's logo. When you share this dashboard with him, the company will see it.";

type Props = {
  logo: File | undefined;
  setLogo: Dispatch<SetStateAction<File | undefined>>;
};
const AdminDashboardPartner: FC<Props> = ({ logo, setLogo }) => {
  return (
    <section className={styles.adminPartner}>
      <h3 className={styleSection.adminSection_title}>Logo your partner</h3>
      <div className={styles.adminPartner_wrapper}>
        <div className={styles.adminPartner_wrapLogo}>
          <UploadImage logo={logo} setLogo={setLogo} isBig={true} />
        </div>
        <div className={styles.adminPartner_wrapHint}>
          <AdminDashboardHint text={textHint} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPartner;
