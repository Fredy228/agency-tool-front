"use client";

import { type FC, type FormEventHandler, useEffect, useState } from "react";
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
  getOrganizationAPI,
  updateOrganizationAPI,
} from "@/axios/organization";
import LoaderPage from "@/components/reused/loader/loader-page";
import LoaderOrig from "@/components/reused/loader/loader-button";
import { OrganizationInterface } from "@/interfaces/organization";

type Props = {
  isEdit: boolean;
};
const SetupForm: FC<Props> = ({ isEdit }) => {
  const router = useRouter();

  const [resOrg, setResOrg] = useState<OrganizationInterface | null>(null);

  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<Array<string>>([]);
  const [isGetting, setIsGetting] = useState<boolean>(true);

  useEffect(() => {
    const getOrg = async () => {
      const data = await getOrganizationAPI();
      if (data && !isEdit) router.push("/welcome");
      if (data && isEdit) {
        setResOrg(data);
        setName(data.name);
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
  }, [router]);

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

    if (isEdit && resOrg) {
      const bodyReq = {
        name: resOrg.name === name ? undefined : name,
        logo,
      };

      const isChanged = Object.values(bodyReq).every((i) => !i);

      if (isChanged) return router.push("/welcome");

      data = await updateOrganizationAPI(bodyReq);
    } else {
      data = await createOrganizationAPI({ name, logo });
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
        isRequired={false}
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
    </form>
  );
};

export default SetupForm;
