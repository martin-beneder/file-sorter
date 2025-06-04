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
    if (!filesUploaded || filesUploaded.length === 0) {
      setError("Bitte lade zuerst Dateien hoch.");
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filesUploaded),
      });
      
      const data = await response.json();
      
      // Handle different response status codes
      if (!response.ok) {
        if (response.status === 400) {
          setError("Bleib langsam, du kannst nicht so schnell Dateien hochladen.");
        } else if (response.status === 401) {
          setError("Bitte melde dich an, um diese Funktion zu nutzen.");
        } else if (response.status === 403) {
          setError("Dein Abonnement erlaubt nicht so viele Dateien.");
        } else if (response.status === 429) {
          setError("Zu viele Anfragen. Bitte warte einen Moment.");
        } else if (data?.error) {
          setError(data.message || "Ein Fehler ist aufgetreten.");
        } else {
          setError("Ein unerwarteter Fehler ist aufgetreten.");
        }
        return null;
      }
      
      setSortData(data);
      return data;
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Verbindungsfehler. Bitte versuche es später erneut.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const getSortData = async (datar: string) => {
    if (!datar) {
      setError("Keine Daten zum Sortieren vorhanden.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/sortdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datar),
      });
      
      const responseData = await response.json();
      
      // Handle different response status codes
      if (!response.ok) {
        if (response.status === 400) {
          setError("Bleib langsam, du kannst nicht so schnell sortieren.");
        } else if (response.status === 401) {
          setError("Bitte melde dich an, um diese Funktion zu nutzen.");
        } else if (response.status === 429) {
          setError("Zu viele Anfragen. Bitte warte einen Moment.");
        } else if (response.status === 502) {
          setError("Der Sortier-Service ist derzeit nicht erreichbar.");
        } else if (responseData?.error) {
          setError(responseData.message || "Ein Fehler ist aufgetreten beim Sortieren.");
        } else {
          setError("Ein unerwarteter Fehler ist beim Sortieren aufgetreten.");
        }
        return;
      }
      
      // Success - set the data
      setData(responseData);
      console.log("Sorted data received:", responseData);
    } catch (error) {
      console.error("Error during sorting API call:", error);
      setError("Verbindungsfehler beim Sortieren. Bitte versuche es später erneut.");
    } finally {
      setIsLoading(false);
    }
  }

  const downloadSortedFiles = async (datar: string) => {
    if (!datar) {
      setError("Keine Daten zum Herunterladen vorhanden.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: datar }),
      });
      
      // Handle errors based on status code
      if (!response.ok) {
        if (response.status === 401) {
          setError("Bitte melde dich an, um diese Funktion zu nutzen.");
          return;
        } else if (response.status === 400) {
          setError("Ungültige Anfrage zum Herunterladen.");
          return;
        } else if (response.status === 502) {
          setError("Der Download-Service ist derzeit nicht erreichbar.");
          return;
        }
        
        try {
          // Try to parse error message from JSON response
          const errorData = await response.json();
          setError(errorData.message || "Fehler beim Herunterladen der Dateien.");
        } catch {
          setError("Fehler beim Herunterladen der Dateien.");
        }
        return;
      }
      
      // Handle successful response
      const responseBlob = await response.blob();
      
      if (responseBlob.size === 0) {
        setError("Die heruntergeladene Datei ist leer.");
        return;
      }
      
      // Create download link
      const url = URL.createObjectURL(responseBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sortedfiles.zip');
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
    } catch (error) {
      console.error("Error downloading files:", error);
      setError("Fehler beim Herunterladen der Dateien.");
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
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-gray-400 bg-opacity-50 z-10">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 z-20 mb-4"></div>
              <div className="bg-white px-6 py-3 rounded-md shadow-md z-20 text-center">
                <p className="text-lg font-semibold text-blue-600 mb-2">
                  {sortData && !data ? "Sortiere Dateien..." : "Verarbeite Dateien..."}
                </p>
                <p className="text-sm text-gray-600">
                  {sortData && !data 
                    ? "Die KI analysiert und sortiert deine Dateien. Bitte warte einen Moment." 
                    : "Deine Dateien werden vorbereitet. Dies kann einige Sekunden dauern."}
                </p>
              </div>
            </div>
            {!data && (
              <div className={`text-left items-start align-top grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2`}>
                {filesUploaded?.map((file, i: number) => (
                  <div key={i} title={file.name} className='flex h-auto w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2'>
                    <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                      <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                        <FileIcon size='60' className='shrink-0 fill-black' />
                        <div className='overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap'>
                          {file.name}
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full w-full animate-pulse"></div>
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
        <div className='flex flex-row mx-auto justify-center my-5' >
          <div className='flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role="alert">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <span className="block sm:inline">{error}</span>
            <button 
              className="ml-4 text-red-700 font-bold" 
              onClick={() => setError(null)}
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {!data && (
        <button className='flex mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={async () => {
          setIsVisible(true);
          getSortData(sortData ?? await getData(filesUploaded));
        }
        }>Sortiere</button>
      )
      }
      {data && (
        <div className='flex flex-row mx-auto justify-center  ' >
          <button disabled={isLoading} className='flex mr-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => {
            getSortData(sortData);
          }}>Neu Sortieren</button>
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