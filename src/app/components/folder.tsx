import { FileIcon, Folder } from 'lucide-react';
import { useState } from 'react';





function removeSquareBrackets(folderName: string) {
    return folderName.replace("[", '').replace(']', '');
}

type FileDetails = {
    filetype: string;
    keywords: Array<string>;
    content: string;
    url: string;
};

interface FileBrowserProps {
    data: Record<string, FileDetails>; // Provide a type for the data property
}

type Dir = Record<string, FileDetails>;

function FileBrowser({ data }: FileBrowserProps) {
    const [path, setPath] = useState<string | null>(null);
    const [dir, setDir] = useState<Record<string, FileDetails>>({});
    function setPathandConvert(newPath: string) {
        if (newPath === "/") {
            setPath(null);
            setDir({});
        } else {
            const normalizedPath = newPath.startsWith("/") ? newPath : `/${newPath}`;
            setPath((prevPath) => `${prevPath || ''}${normalizedPath}/`);
            const pathAr = normalizedPath.replace(/^\/|\/$/g, '').split('/');
            let lastDirCont = data; // Assuming 'data' structure is compatible with 'Dir' for initial directory content
            pathAr.forEach((dirName) => {
                if (typeof lastDirCont[dirName] === 'object' && !Array.isArray(lastDirCont[dirName])) {
                    lastDirCont = lastDirCont[dirName] as unknown as Dir; // Update to navigate deeper into nested directories, assuming the structure allows for this
                }
            });
            setDir(lastDirCont);
        }
    }

    return (
        <div className="p-4">
            {!path ? (
                <div>
                    <h2 className="text-xl font-bold">/</h2>
                    <div className={` text-left items-start align-top grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2`}>
                        {Object.keys(data).map((folder) => (
                            <div title={removeSquareBrackets(folder.replace('_', ' '))} key={folder} className='cursor-pointer flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2' onClick={() => setPathandConvert(folder)}>
                                <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                                    <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                                        <Folder size='60' className='shrink-0 fill-black ' />
                                        <div className='overflow-hidden w-36 text-black overflow-ellipsis whitespace-nowrap'>
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
                    <h2 className="text-xl font-bold">{removeSquareBrackets(path.replace('_', ' '))}</h2>
                    <div className={` text-left items-start align-top grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2`}>
                        {Object.keys(dir).map((fileName) => (
                            <div title={fileName} key={fileName} className='flex h-auto  w-40 max-w-[50vw] flex-col justify-center rounded border border-gray-300 px-4 py-2'>
                                <div className='flex items-left gap-2 text-gray-500 dark:text-white'>
                                    <div className='min-w-0 text-sm flex flex-col items-center mx-auto'>
                                        <FileIcon size='60' className='shrink-0 fill-black ' />
                                        <div className='overflow-hidden w-32 text-black overflow-ellipsis whitespace-nowrap'>
                                            {fileName}
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
