'use client';

import {
  MultiFileDropzone,
  type FileState,
} from './mutlifile';
import { useEdgeStore } from '@/app/lib/edgestore';
import { useState } from 'react';
import {
  FileIcon,
} from 'lucide-react';
import FileBrowser from './folder';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { subscriptionmodel } from '../lib/util';


export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [isVisible, setIsVisible] = useState(false);



  const user = useUser();

  interface FileUpload {
    name: string;
    result: unknown;
  }

  const [filesUploaded, setFilesUploaded] = useState<FileUpload[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [sortData, setSortData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);



  const getData = async (filesUploaded: FileUpload[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sort', {
        method: 'POST',
        body: JSON.stringify(filesUploaded),
      });
      if (await response.status === 400) {
        setError("Bleib langsam, du kannst nicht so schnell Datein hochladen.")
      }
      const datar = await response.json();
      setSortData(datar);
      return datar;

    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const getSortData = async (datar: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let sortdata = await fetch('/api/sortdata', {
        method: 'POST',
        body: JSON.stringify(datar),
      });
      if (await sortdata.status === 400) {
        setError("Bleib langsam, du kannst nicht so schnell sortieren.")
      } else {
        if (!sortdata.ok) {
          sortdata = await fetch('/api/sortdata', {
            method: 'POST',
            body: JSON.stringify(datar),
          });
        }

        if (sortdata.ok) {

          const Reponssortdata = await sortdata.json();
          setData(await Reponssortdata);
          console.log("data:", await data);
        }

      }
    } finally {
      setIsLoading(false);
    }
  }

  const downloadSortedFiles = async (datar: string) => {
    setIsLoading(true);
    try {
      let sortdata = await fetch('/api/download', {
        method: 'POST',
        body: JSON.stringify({ data: datar }),
      });
      if (!sortdata.ok) {
        sortdata = await fetch('/api/download', {
          method: 'POST',
          body: JSON.stringify({ data: datar }),
        });
      }

      const Reponssortdata = await sortdata.blob();
      console.log("Reponssortdata:", Reponssortdata);
      const url = URL.createObjectURL(Reponssortdata); // And this line
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sortedfiles.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }




  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });


  }



  return (
    <div>
      <MultiFileDropzone
        className={`${isVisible ? 'hidden' : 'block'}`}
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        dropzoneOptions={
          {
            maxFiles: subscriptionmodel(user?.user?.unsafeMetadata?.subscriptionid as number)?.maxfiles ?? 0,
            maxSize: 536870912,
            accept: { 'image/*': [], 'application/vnd.ms-excel': [], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], 'application/pdf': [], 'application/msword': [], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], 'text/plain': [], 'application/vnd.ms-powerpoint': [], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': [], 'application/vnd.oasis.opendocument.text': [], 'application/vnd.oasis.opendocument.spreadsheet': [], 'application/vnd.oasis.opendocument.presentation': [], 'text/css': [], 'text/csv': [], 'application/rtf': [], 'text/javascript': [], 'text/html': [] },
          }
        }
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    manualFileName: `${Date.now()}-${addedFileState.file.name}`,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      console.log("file:", addedFileState.file.name)
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });


                setFilesUploaded((filesUploaded) => [
                  ...filesUploaded,
                  { name: addedFileState.file.name, result: res },
                ]);


                console.log("res:", res);
                console.log("filesUploaded:", filesUploaded);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />

      <div className={`${isVisible ? 'block' : 'hidden'} relative rounded-md p-10 m-12 max-w-[calc(100vw-1rem)] flex items-start flex-col cursor-auto border border-solid border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out`}>
        {isLoading && (
          <div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-400 bg-opacity-50 z-10">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 z-20"></div>
            </div>
            {!data && (

              <div className={` text-left items-start align-top grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2`}>
                {filesUploaded?.map((file, i: number) => (
                  <div key={i} title={file.name} className='flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2'>
                    <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                      <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                        <FileIcon size='60' className='shrink-0 fill-black ' />
                        <div className='overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap'>
                          {file.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            )}
          </div>
        )}
        {data && <FileBrowser data={data} />}

      </div>
      {error && (
        <div className='flex flex-row mx-auto justify-center my-5 ' >
          <div className='flex mr-5 bg-red-500 text-white font-bold py-2 px-4 rounded'>{error}</div>
        </div>
      )}

      {!data && (
        <button className=' flex mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={async () => {
          setIsVisible(true);
          getSortData(sortData ?? await getData(filesUploaded));
        }
        }>Sotiere</button>
      )
      }
      {data && (
        <div className='flex flex-row mx-auto justify-center  ' >
          <button disabled={isLoading} className='flex mr-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => {
            getSortData(sortData);
          }}>Neu Sotieren</button>
          <button disabled={isLoading} className='flex mr-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => {
            downloadSortedFiles(data);
          }}>Download</button>
          <button disabled={isLoading} className='flex  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => {
            location.reload();
          }}>Neu Start?</button>
        </div>
      )}





    </div>


  );
}