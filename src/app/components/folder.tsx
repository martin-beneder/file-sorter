import { FileIcon, Folder } from 'lucide-react';
import React, { useState } from 'react';

interface FileData {
    [folderName: string]: string[];
}
interface FileBrowserProps {
    data: FileData;
}

function removeSquareBrackets(folderName: string) {
    return folderName.replace("[", '').replace(']', '');
}





let Dir: any[] | undefined = [];


const FileBrowser: React.FC<FileBrowserProps> = ({ data }) => {
    const [path, setPath] = useState<string | null>(null);



    function setPathandConvert(newPath: string) {

        if (newPath === "/") {
            setPath(null);
            Dir = []
        } else {

            setPath(`${path || "/" + newPath}/`);
            const pathAr = newPath.replace(/^\/|\/$/g, '').split('/');
            let lastDirCont;
            pathAr?.forEach(dir => {
                lastDirCont = data[dir];
            });
            Dir = lastDirCont;
        }

    }



    return (
        <div className="p-4">
            {!path ? (
                <div>
                    <h2 className="text-xl font-bold">Folders</h2>
                    <div className={` text-left items-start align-top grid grid-flow-col gap-2`}>
                        {Object.keys(data).map((folder) => (
                            <div key={folder} className='cursor-pointer flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2' onClick={() => setPathandConvert(folder)}>
                                <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                                    <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                                        <Folder size='60' className='shrink-0 fill-black ' />
                                        <div className='overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap'>
                                            {removeSquareBrackets(folder.replace('_', ' '))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => setPathandConvert("/")}>Back</button>
                    <h2 className="text-xl font-bold">{path.replace('_', ' ')}</h2>
                    <div className={` text-left items-start align-top grid grid-flow-col gap-2`}>
                        {Dir ?? [].map((file) => (
                            <div key={file} className='flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2'>
                                <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                                    <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                                        <FileIcon size='60' className='shrink-0 fill-black ' />
                                        <div title={file} className='overflow-hidden w-28 text-black overflow-ellipsis whitespace-nowrap'>
                                            {file}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileBrowser;