import React, { useState } from 'react';

interface FileData {
    [folderName: string]: string[];
}
interface FileBrowserProps {
  data: FileData;
}

function removeSquareBrackets(folderName: string) {
    return folderName.replace(/_/g, ' ');
    }



let Dir: any[] | undefined = []; 


const FileBrowser: React.FC<FileBrowserProps> = ({ data }) => {
  const [path, setPath] = useState<string | null>("/");

  

  function setPathandConvert(newPath: string) {

    if (newPath === "/") {
        setPath(null);
        Dir = []
    } else {
    
    setPath(`${path || "/" + newPath}/`);
    console.log("newPath:", newPath);
    console.log("path:", path);
    const pathAr = newPath.replace(/^\/|\/$/g, '').split('/');
    console.log(pathAr);
    console.log("data:", data);

    let lastDirCont;

    pathAr?.forEach(dir => {
        lastDirCont = data[dir];
    });

    console.log("lastDir:", lastDirCont);
    Dir = lastDirCont;
    console.log("Dir:", Dir);
    }
    
}
  


  return (
    <div className="p-4">
      {!path ? (
        <div>
          <h2 className="text-xl font-bold">Folders</h2>
          <ul>
            {Object.keys(data).map((folder) => (
              <li key={folder} className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => setPathandConvert(folder)}>
                {removeSquareBrackets(folder.replace('_', ' '))}
              </li>
            ))}
          </ul>
        </div>
    ) : (
        <div>
            <button className="text-blue-500 hover:text-blue-700" onClick={() => setPathandConvert("/")}>Back</button>
            <h2 className="text-xl font-bold">{path.replace('_', ' ')}</h2>
            <ul>
                {Dir ?? [].map((file) => (
                    <li key={file}>{file}</li>
                ))}
            </ul>
        </div>
    )}
    </div>
  );
};

export default FileBrowser;