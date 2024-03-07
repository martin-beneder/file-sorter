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


const FileBrowser: React.FC<FileBrowserProps> = ({ data }) => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  return (
    <div className="p-4">
      {!currentFolder ? (
        <div>
          <h2 className="text-xl font-bold">Folders</h2>
          <ul>
            {Object.keys(data).map((folder) => (
              <li key={folder} className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => setCurrentFolder(folder)}>
                {removeSquareBrackets(folder.replace('_', ' '))}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setCurrentFolder(null)}>Back</button>
          <h2 className="text-xl font-bold">{currentFolder.replace('_', ' ')}</h2>
          <ul>
            {data[currentFolder].map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileBrowser;