'use client';

import {
  CheckCircleIcon,
  FileIcon,
  LucideFileWarning,
  Trash2Icon,
  UploadCloudIcon,
} from 'lucide-react';
import { forwardRef, useState, useMemo } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

const variants = {
  base: ' rounded-md p-10 m-12 grid grid-cols-3 gap-4 h-auto    item-start cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
  active: 'border-2',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30  ',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const MultiFileDropzone = forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = useState<string>();
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }
    // dropzone configuration



    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (files) {

          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: 'PENDING',
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(value ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div className="flex flex-col ">
          <div>
            {/* Main File Input */}
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input className='z-0' ref={ref} {...getInputProps()} />
              {value?.length ? null :
                <div className="flex flex-col mx-auto my-10 items-center justify-center z-0 text-xs text-gray-400">
                  <UploadCloudIcon className="mb-1 h-14 w-14" />
                  <div className="text-gray-400">
                    drag & drop oder Klick um hoch zu laden
                  </div>
                </div>}

              {/* Selected Files */}
              <div className='z-50 text-left items-start align-top grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2  ' >
                {value?.map(({ file, progress }, i) => (
                  <div
                    key={i}
                    className="flex h-auto w-30  sm:w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-200 px-4 py-2"
                  >
                    <div className="flex items-left gap-2 text-gray-200 dark:text-white">

                      <div className="min-w-0 text-sm flex flex-col items-center mx-auto">
                        <FileIcon size="60" className="shrink-0 fill-black" />
                        <div className="text-xs text-gray-200 dark:text-gray-200">
                          {formatFileSize(file.size)}
                        </div>
                        <div className="overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap">
                          {file.name}
                        </div>


                        {progress === 'PENDING' ? (
                          <button
                            type="button"
                            title='Remove file'
                            className="rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-100"
                            onClick={() => {
                              void onChange?.(
                                value.filter((_, index) => index !== i),
                              );
                            }}
                          >
                            <Trash2Icon className="shrink-0" />
                          </button>
                        ) : progress === 'ERROR' ? (
                          <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
                        ) : progress !== 'COMPLETE' ? (
                          <div>{Math.round(progress)}%</div>
                        ) : (
                          <CheckCircleIcon className="shrink-0 text-green-600 dark:text-gray-400" />
                        )}
                      </div>

                    </div>
                    {/* Progress Bar */}
                    {typeof progress === 'number' && (
                      <div className="relative h-0">
                        <div className=" text-black absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-400 dark:bg-gray-200">
                          <div
                            className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-black"
                            style={{
                              width: progress ? `${progress}%` : '0%',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>


          </div>


        </div>
        {/* Error Text */}
        {(customError ?? errorMessage) && (
          <div className='flex flex-row mx-auto justify-center my-5 ' >
            <div className='flex mr-5 bg-red-500 text-white font-bold py-2 px-4 rounded'>{customError ?? errorMessage}</div>
          </div>
        )}
      </div>

    );
  },
);
MultiFileDropzone.displayName = 'MultiFileDropzone';

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes';
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { MultiFileDropzone };