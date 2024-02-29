"use client";

import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./admin-dashboard-build.module.scss";

import AdminDashboardName from "@/components/ui/welcome/dashboard-admin/name/AdminDashboardName";
import AdminDashboardImage from "@/components/ui/welcome/dashboard-admin/wecome-image/AdminDashboardImage";
import AdminDashboardText from "@/components/ui/welcome/dashboard-admin/welcome-text/AdminDashboardText";
import AdminDashboardPartner from "@/components/ui/welcome/dashboard-admin/logo-partner/AdminDashboardPartner";
import AdminDashboardPassword from "@/components/ui/welcome/dashboard-admin/name/AdminDashboardPassword";
import { dashboardCreateSchema } from "@/joi/dashbard-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import { deleteLogoDashbAPI, updateDashboardAPI } from "@/axios/dashboad";
import LoaderOrig from "@/components/reused/loader/loader-button";
import { DashboardInterface } from "@/interfaces/dashboard";
import { deleteLogoOrgAPI } from "@/axios/organization";
import { isAxiosError } from "axios";
import { AnimatePresence } from "framer-motion";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  dashboard: DashboardInterface;
};
const AdminDashBoardBuildEdit: FC<Props> = ({ name, setName, dashboard }) => {
  const router = useRouter();

  const [password, setPassword] = useState<string>(dashboard.password);
  const [screenUrl, setScreenUrl] = useState<string>(dashboard.screenUrl);
  const [textOne, setTextOne] = useState<string>(dashboard.textOne);
  const [textTwo, setTextTwo] = useState<string>(dashboard.textTwo);
  const [textThree, setTextThree] = useState<string>(dashboard.textThree);
  const [logo, setLogo] = useState<File | null>(null);
  const [bufferImg, setBufferImg] = useState<Buffer | null>(
    dashboard.logoPartnerUrl,
  );

  const [editText, setEditText] = useState<string | null>(null);
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowDel, setIsShowDel] = useState<number | null>(null);

  const submitForm = async () => {
    setIsLoading(true);
    setInvalidInput(null);

    const { error } = dashboardCreateSchema.validate({
      name,
      textOne,
      textTwo,
      textThree,
      password,
      screenUrl,
    });

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    try {
      await updateDashboardAPI(
        {
          name: name === dashboard.name ? undefined : name,
          password: password === dashboard.password ? undefined : password,
          screenUrl: screenUrl === dashboard.screenUrl ? undefined : screenUrl,
          textOne: textOne === dashboard.textOne ? undefined : textOne,
          textThree: textThree === dashboard.textThree ? undefined : textThree,
          textTwo: textTwo === dashboard.textTwo ? undefined : textTwo,
          logoPartner: logo,
        },
        dashboard.id,
      );
      getToastify("Updated successful", ToastifyEnum.SUCCESS, 3000);
      router.push("/welcome");
    } catch (e) {
      setIsLoading(false);
      getToastify("Unknow error", ToastifyEnum.ERROR, 3000);
    }
  };

  const handleDeleteLogo = () => {
    setIsShowDel(1);
  };

  const logoDelete = async () => {
    try {
      setIsLoading(true);
      await deleteLogoDashbAPI(dashboard.id);
      setBufferImg(null);
      setIsShowDel(null);
      getToastify("Logo deleted", ToastifyEnum.SUCCESS);
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.message) {
        getToastify(e.response?.data?.message, ToastifyEnum.ERROR);
      } else {
        getToastify("Unknown error", ToastifyEnum.ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.adminBuild}>
      <AdminDashboardName
        name={name}
        setName={setName}
        editText={editText}
        setEditText={setEditText}
        invalidInput={invalidInput}
        edit={true}
        dashboard={dashboard}
      />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardImage screenUrl={screenUrl} setScreenUrl={setScreenUrl} />
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
        invalidInput={invalidInput}
        edit={true}
        dashboard={dashboard}
      />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardPartner
        bufferImg={bufferImg}
        setBufferImg={setBufferImg}
        logo={logo}
        setLogo={setLogo}
        handleDeleteLogo={handleDeleteLogo}
      />
      <span className={styles.adminBuild_line}></span>
      <AdminDashboardPassword
        pass={password}
        setPass={setPassword}
        editText={editText}
        setEditText={setEditText}
        invalidInput={invalidInput}
        edit={true}
        dashboard={dashboard}
      />
      <div className={styles.adminBuild_wrapBtn}>
        <Link
          href={isLoading ? "" : "/welcome"}
          className={styles.adminBuild_cancelBtn}
        >
          Cancel
        </Link>
        <button
          onClick={submitForm}
          className={styles.adminBuild_applyBtn}
          type={"button"}
          disabled={isLoading}
        >
          {isLoading ? <LoaderOrig color={"#fff"} /> : "Update"}
        </button>
      </div>
      {isShowDel === 1 && (
        <AnimatePresence>
          <ModalWindow setShowIdx={setIsShowDel}>
            <WindowConfirm
              isLoading={isLoading}
              setShow={setIsShowDel}
              question={"You sure you want to remove the logo"}
              action={logoDelete}
            />
          </ModalWindow>
        </AnimatePresence>
      )}
    </div>
  );
};
export default AdminDashBoardBuildEdit;
