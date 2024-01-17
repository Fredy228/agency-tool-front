"use client";

import { type FC, useState } from "react";

import styles from "./admin-dashboard-build.module.scss";

import AdminDashboardName from "@/components/ui/welcome/dashboard-admin/name/AdminDashboardName";
import AdminDashboardImage from "@/components/ui/welcome/dashboard-admin/wecome-image/AdminDashboardImage";
import AdminDashboardText from "@/components/ui/welcome/dashboard-admin/welcome-text/AdminDashboardText";
import AdminDashboardPartner from "@/components/ui/welcome/dashboard-admin/logo-partner/AdminDashboardPartner";

const AdminDashBoardBuild: FC = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [textOne, setTextOne] = useState<string>("");
  const [textTwo, setTextTwo] = useState<string>("");
  const [textThree, setTextThree] = useState<string>("");
  const [logo, setLogo] = useState<File | undefined>(undefined);

  const [editText, setEditText] = useState<string | null>(null);

  return (
    <div className={styles.adminBuild}>
      <AdminDashboardName
        name={name}
        setName={setName}
        editText={editText}
        setEditText={setEditText}
      />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardImage image={image} setImage={setImage} />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardText
        textOne={textOne}
        textTwo={textTwo}
        textThree={textThree}
        setTextOne={setTextOne}
        setTextTwo={setTextTwo}
        setTextThree={setTextThree}
        editText={editText}
        setEditText={setEditText}
      />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardPartner logo={logo} setLogo={setLogo} />
      <div className={styles.adminBuild_wrapBtn}>
        <button className={styles.adminBuild_cancelBtn} type={"button"}>
          Cancel
        </button>
        <button className={styles.adminBuild_applyBtn} type={"button"}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AdminDashBoardBuild;
