import { Button, UploadZone } from "@app/ui";

import CLASSNAMES from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "@app/router/path";
import { useState } from "react";
import { DropzoneProps } from "react-dropzone";
import { ExceptionService } from "@domain/common/service";
import { ICreateSessionError } from "@domain/session/use-cases/create-use-case";

type FileFormFields = "dictionary" | "prefix";
type IFileFormValues = Record<FileFormFields, File | null>;

const dropzoneProps: DropzoneProps = {
  accept: {
    "text/plain": [],
  },
};

interface IFilesFormProps {
  onUpload: (data: IFileFormValues) => Promise<void>;
}

const FilesForm = (props: IFilesFormProps): JSX.Element => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<Record<ICreateSessionError, string>>>({})
  const [data, setData] = useState<IFileFormValues>({
    dictionary: null,
    prefix: null,
  });

  const handleOnSubmit = async () => {
    try {
      setErrors({})
      await props.onUpload(data);
    } catch (exception: any) {
      const error = exception as ExceptionService<ICreateSessionError>
      if (error.data) {
        setErrors(error.data)
      }
    }
  };

  const handleRedirect = (path: string) => () => {
    navigate(path);
  };

  const handleChangeFileInput = (name: string) => (file: File) => {
    if (name === 'dictionary') setErrors((prev) => ({ ...prev, 'file_dictionary': undefined }))
    if (name === 'prefix') setErrors((prev) => ({ ...prev, 'file_prefix': undefined }))
    
    setData((prev) => ({ ...prev, [name]: file }));
  };

  return (
    <div className={CLASSNAMES.form_container}>
      <div className={CLASSNAMES.form_container__inputs}>
        <div className="w-full flex flex-col gap-1">
          <UploadZone
            title="Загрузите словарь"
            onChange={handleChangeFileInput("dictionary")}
            DropzoneProps={dropzoneProps}
            isShowErrors={!!errors.file_dictionary}
          />
          { errors.file_dictionary && <p className="text-red-500">{errors.file_dictionary}</p> }
        </div>
        <div className="w-full flex flex-col gap-1">
          <UploadZone
            title="Загрузите приставки"
            onChange={handleChangeFileInput("prefix")}
            DropzoneProps={dropzoneProps}
            isShowErrors={!!errors.file_prefix}
          />
          { errors.file_prefix && <p className="text-red-500">{errors.file_prefix}</p> }
        </div>
      </div>
      <div className={CLASSNAMES.form_container__buttons}>
        <Button
          color="secondary"
          size="small"
          onClick={handleRedirect(RouterPath.UF_GREETING)}
        >
          Назад
        </Button>
        <Button color="primary" size="small" onClick={handleOnSubmit}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export type { IFileFormValues };
export { FilesForm };
