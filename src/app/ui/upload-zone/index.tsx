import { DropzoneOptions, useDropzone } from "react-dropzone";

import CLASSNAMES from "./index.module.css";
import { useCallback, useMemo, useState } from "react";

interface IUploadZoneProps {
  title: string;
  onChange: (file: File) => void;
  DropzoneProps?: Omit<DropzoneOptions, 'onDrop'>
  isShowErrors?: boolean
}

const UploadZone = (props: IUploadZoneProps): JSX.Element => {
    const [file, setFile] = useState<null | File>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length) {
        const payload = acceptedFiles[0]
        setFile(payload)
        props.onChange(payload)
    }
  }, []);

  const {
    getInputProps,
    getRootProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
    ...props.DropzoneProps
  });

  const rootClassname = useMemo(() => {
    return [
      CLASSNAMES.dropzone,
      props.isShowErrors ? CLASSNAMES.dropzone_is_reject : null,
      isDragAccept ? CLASSNAMES.dropzone_is_accept : null,
      isDragReject ? CLASSNAMES.dropzone_is_reject : null,
    ]
      .filter((item) => item !== null)
      .join(" ");
  }, [isFocused, isDragAccept, isDragReject, props.isShowErrors]);

  return (
    <section className={CLASSNAMES.dropzone_container}>
      <div {...getRootProps({ className: rootClassname })}>
        <input {...getInputProps()} />
        <p>{props.title}</p>
        { file && <p>({file.name})</p> }
      </div>
    </section>
  );
};

export { UploadZone };
