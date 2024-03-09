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
import Folder from './folder';
import FileBrowser from './folder';
import { get } from 'http';


export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [isVisible, setIsVisible] = useState(false);

  interface FileUpload {
    name: string;
    result: unknown;
  }

  const [filesUploaded, setFilesUploaded] = useState<FileUpload[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [sortData, setSortData] = useState<any>(null);
  

  const getData = async (filesUploaded: FileUpload[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filesUploaded),
      });
      const data = await response.json();
      // console.log("data:", data);
      setSortData(data);
      return data;
      
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const getSortData = async (datar: string) => {
    setIsLoading(true);
    try {
      let sortdata = await fetch('/api/sortdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datar),
      });
      if (!sortdata.ok) {
        sortdata = await fetch('/api/sortdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datar),
        });
      }

      const Reponssortdata = await sortdata.json();
      setData(Reponssortdata ?? datar);
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



      {data && (
        <div className="mt-4">
          {/* Render your data component here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}





      <div className={`${isVisible ? 'block' : 'hidden'} relative rounded-md p-10 m-24 max-w-[calc(100vw-1rem)] flex items-start flex-col cursor-auto border border-solid border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out`}>
        {isLoading && (
          <div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-400 bg-opacity-50 z-10">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 z-20"></div>
            </div>
            {!data && (
              
            <div className={` text-left items-start align-top grid grid-flow-col gap-2`}>
              {filesUploaded?.map((file, i: number) => (
                <div key={i} title={file.name} className='flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2'>
                  <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                    <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                      <FileIcon size='60' className='shrink-0 fill-black ' />
                      <div  className='overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap'>
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

      {!data && (
           <button className=' flex mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={async () => {
            console.log("filesUploaded:", filesUploaded);
            setIsVisible(true);
            getSortData(await getData(filesUploaded));
            }
          }>Sotiere</button>
            )
            }
        {data && (
          <button className='felx mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => {
            getSortData(sortData);
          }}>Resort</button>
        )}


      
    </div>


  );
}