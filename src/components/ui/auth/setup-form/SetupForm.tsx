"use client";

import {
  type FC,
  type FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import styles from "./setup-form.module.scss";
import formStyles from "@/components/styles/form-common.module.scss";

import UploadImage from "@/components/reused/upload-image/UploadImage";
import { orgCreateSchema, orgUpdateSchema } from "@/joi/organization-schema";
import { getToastify, ToastifyEnum } from "@/services/toastify";
import {
  createOrganizationAPI,
  deleteLogoOrgAPI,
  getOrganizationAPI,
  updateOrganizationAPI,
} from "@/axios/organization";
import LoaderPage from "@/components/reused/loader/loader-page";
import LoaderOrig from "@/components/reused/loader/loader-button";
import { OrganizationInterface } from "@/interfaces/organization";
import WindowConfirm from "@/components/reused/window-confirm/WindowConfirm";
import ModalWindow from "@/components/reused/modal-window/ModalWindow";
import { AnimatePresence } from "framer-motion";

type Props = {
  isEdit: boolean;
};
const SetupForm: FC<Props> = ({ isEdit }) => {
  const router = useRouter();

  const [resOrg, setResOrg] = useState<OrganizationInterface | null>(null);

  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [bufferImg, setBufferImg] = useState<Buffer | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);
  const [isGetting, setIsGetting] = useState<boolean>(true);
  const [isShowDel, setIsShowDel] = useState<number | null>(null);

  const isFirst = useRef<boolean>(false);

  const handleDeleteLogo = () => {
    setIsShowDel(1);
  };

  const logoDelete = async () => {
    try {
      setIsLoading(true);
      await deleteLogoOrgAPI();
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

  useEffect(() => {
    if (isFirst.current) return;
    isFirst.current = true;

    const getOrg = async () => {
      const data = await getOrganizationAPI();
      console.log(data);
      if (data && !isEdit) router.push("/welcome");
      if (data && isEdit) {
        setResOrg(data);
        setName(data.name);
        setBufferImg(data.logoUrl);
        setIsGetting(false);
      }
    };

    getOrg().catch((e) => {
      setIsGetting(false);
      if (isAxiosError(e) && e.response) {
        if (e.response.status !== 404) {
          getToastify("Unknown error", ToastifyEnum.ERROR);
        }
      }
    });
  }, [router, isEdit]);

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setInvalidInput([]);

    let joiError;

    if (isEdit) {
      const { error } = orgUpdateSchema.validate({ name });
      joiError = error;
    } else {
      const { error } = orgCreateSchema.validate({ name });
      joiError = error;
    }

    if (joiError) {
      const nameField = joiError.message.split("|")[0];
      setInvalidInput((prevState) => [...prevState, nameField]);

      setIsLoading(false);
      return getToastify(
        joiError.message.split("|")[1],
        ToastifyEnum.ERROR,
        5000,
      );
    }

    let data;

    try {
      if (isEdit && resOrg) {
        const bodyReq = {
          name: resOrg.name === name ? undefined : name,
          logo: logo ? logo : undefined,
        };

        const isChanged = Object.values(bodyReq).every((i) => i === undefined);

        if (isChanged) return router.push("/welcome");

        data = await updateOrganizationAPI(bodyReq);
      } else {
        data = await createOrganizationAPI({ name, logo });
      }
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.message) {
        getToastify(e.response?.data?.message, ToastifyEnum.ERROR, 5000);
      } else {
        getToastify("Unknown error", ToastifyEnum.ERROR, 5000);
      }
    }

    if (data) router.push("/welcome");
  };

  if (isGetting) return <LoaderPage />;

  return (
    <form
      className={`${formStyles.form} ${styles.setupForm}`}
      onSubmit={submitForm}
    >
      <label className={formStyles.form_label}>
        <span>Name of Organization</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput.includes("name") && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your organization's name"}
          value={name}
          name={"name"}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <UploadImage
        logo={logo}
        setLogo={setLogo}
        name={"Logo"}
        bufferImg={bufferImg}
        setBufferImg={setBufferImg}
        isRequired={false}
        handleDeleteLogo={handleDeleteLogo}
      />
      <div className={styles.setupForm_wrapperBtn}>
        <button
          className={`${formStyles.form_applyBtn} ${styles.setupForm_buttonSign}`}
          type={"submit"}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderOrig color={"#fff"} />
          ) : (
            <>{isEdit ? "Edit" : "Confirm"}</>
          )}
        </button>

        <Link
          href={isLoading ? "" : "/welcome"}
          className={`${formStyles.form_cancelBtn} ${styles.setupForm_buttonSign}`}
        >
          {isEdit ? "Cancel" : "Skip"}
        </Link>
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
    </form>
  );
};

export default SetupForm;
