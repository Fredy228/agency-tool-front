import { Dispatch, type FC, SetStateAction } from "react";

import styles from "./admin-dashboard-partner.module.scss";
import styleSection from "../dashboard-build/admin-dashboard-section.module.scss";
import UploadImage from "@/components/reused/upload-image/UploadImage";
import AdminDashboardHint from "@/components/ui/welcome/dashboard-admin/hint/AdminDashboardHint";

const textHint =
  "Here you can upload your partner's logo. When you share this dashboard with him, the company will see it.";

type Props = {
  logo: File | null;
  setLogo: Dispatch<SetStateAction<File | null>>;
  setBufferImg: Dispatch<SetStateAction<Buffer | null>>;
  bufferImg: Buffer | null;
  handleDeleteLogo: () => void;
};
const AdminDashboardPartner: FC<Props> = ({
  logo,
  setLogo,
  setBufferImg,
  bufferImg,
  handleDeleteLogo,
}) => {
  return (
    <section id={"logo-partner"} className={styles.adminPartner}>
      <h3 className={styleSection.adminSection_title}>Logo your partner</h3>
      <div className={styles.adminPartner_wrapper}>
        <div className={styles.adminPartner_wrapLogo}>
          <UploadImage
            bufferImg={bufferImg}
            setBufferImg={setBufferImg}
            logo={logo}
            setLogo={setLogo}
            isBig={true}
            handleDeleteLogo={handleDeleteLogo}
          />
        </div>
        <div className={styles.adminPartner_wrapHint}>
          <AdminDashboardHint text={textHint} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPartner;
