"use client";

import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import formStyles from "@/components/styles/form-common.module.scss";
import styles from "./add-link-form.module.scss";

import { getToastify, ToastifyEnum } from "@/services/toastify";
import CustomSelect from "@/components/reused/custom-select/CustomSelect";

import { listOptionsImg } from "@/components/ui/dashboard/links/add-link/add-link-form/listOptionsImg";
import { TypeOptionSelectImg } from "@/types/custom-select-types";
import { linkCreateSchema, linkUpdateSchema } from "@/joi/link-schema";
import LoaderOrig from "@/components/reused/loader/loader-button";
import { createLinkAPI, updateLinkAPI } from "@/axios/link";
import { useParams } from "next/navigation";
import { actionLink, addLink, updateLink } from "@/redux/link/slice";
import { selectActionLink } from "@/redux/link/selectors";
import { CreateLinkType, UpdateLinkType } from "@/types/link-types";
import { outputError } from "@/services/output-error";

type Props = {
  setIsShowAddLink: Dispatch<SetStateAction<boolean>>;
  setIsShowIdx: Dispatch<SetStateAction<number | null>>;
};
const AddLinkForm: FC<Props> = ({ setIsShowAddLink, setIsShowIdx }) => {
  const [image, setImage] = useState<TypeOptionSelectImg | null>(null);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [invalidInput, setInvalidInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currLink = useSelector(selectActionLink);

  const params = useParams();
  const dispacth: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (!currLink) return;

    const findIco = listOptionsImg.find((i) => i.value === currLink.image);

    setImage(findIco ? findIco : listOptionsImg[0]);
    setName(currLink.name);
    setUrl(currLink.url);
    setDescription(currLink.description);
  }, [currLink, dispacth]);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setInvalidInput("");

    if (!image?.value)
      return getToastify(
        "You haven't chosen an icon",
        ToastifyEnum.ERROR,
        5000,
      );

    const dataBody = currLink
      ? {
          name: name?.trim() === currLink?.name ? undefined : name.trim(),
          url: url?.trim() === currLink?.url ? undefined : url.trim(),
          description:
            description?.trim() === currLink?.description
              ? undefined
              : description.trim(),
          image: image.value === currLink?.image ? undefined : image.value,
        }
      : {
          name: name.trim(),
          url: url.trim(),
          description: description.trim(),
          image: image.value,
        };

    const { error } = currLink
      ? linkUpdateSchema.validate(dataBody)
      : linkCreateSchema.validate(dataBody);

    if (error) {
      const nameField = error.message.split("|")[0];
      setInvalidInput(nameField);

      setIsLoading(false);
      return getToastify(error.message.split("|")[1], ToastifyEnum.ERROR, 5000);
    }

    try {
      if (currLink) {
        await updateLinkAPI({
          ...dataBody,
          idLink: currLink.id,
        } as UpdateLinkType);
        dispacth(
          updateLink({
            ...dataBody,
            id: currLink.id,
          }),
        );
        getToastify("Link updated", ToastifyEnum.SUCCESS, 3000);
      } else {
        const createdLink = await createLinkAPI({
          ...dataBody,
          idDashb: params.id as string,
        } as CreateLinkType);
        dispacth(addLink(createdLink));
        getToastify("Link created", ToastifyEnum.SUCCESS, 3000);
      }
      setIsShowAddLink(false);
      setIsShowIdx(null);
      dispacth(actionLink(null));
    } catch (e) {
      outputError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={`${formStyles.form} ${styles.linkForm}`}
      onSubmit={onFormSubmit}
    >
      <label className={formStyles.form_label}>
        <span>Image</span>
      </label>
      <CustomSelect
        currentValue={image}
        setCurrentValue={setImage}
        options={listOptionsImg}
      />
      <label className={formStyles.form_label}>
        <span>Name</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput === "name" && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your text"}
          value={name}
          name={"name"}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <label className={formStyles.form_label}>
        <span>URL</span>

        <input
          className={`${formStyles.form_input} ${
            invalidInput === "url" && formStyles.invalid
          }`}
          type="text"
          placeholder={"Enter your URL address"}
          value={url}
          name={"url"}
          onChange={(e) => setUrl(e.currentTarget.value)}
        />
      </label>
      <label className={formStyles.form_label}>
        <span>Description</span>

        <textarea
          className={`${formStyles.form_input} ${formStyles.textarea} ${
            invalidInput === "description" && formStyles.invalid
          }`}
          placeholder={"Enter your description"}
          value={description}
          name={"description"}
          cols={2}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </label>
      <div className={styles.linkForm_wrapperBtn}>
        <button
          className={`${formStyles.form_cancelBtn} ${styles.linkForm_buttonSign}`}
          type={"button"}
          onClick={() => setIsShowAddLink(false)}
          disabled={isLoading}
        >
          Cancel
        </button>

        <button
          className={`${formStyles.form_applyBtn} ${styles.linkForm_buttonSign}`}
          type={"submit"}
          disabled={!image || isLoading}
        >
          {isLoading ? <LoaderOrig color={"#fff"} /> : "Save Link"}
        </button>
      </div>
    </form>
  );
};

export default AddLinkForm;
