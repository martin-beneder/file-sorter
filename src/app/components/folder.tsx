// components/Folder.tsx

import React from 'react';

interface FolderProps {
    data: { [key: string]: any }; // Flexible to accommodate nested folders
    path: string[];
}

const Folder: React.FC<FolderProps> = ({ data, path }) => {
    return (
        <div>
            {Object.entries(data).map(([key, value]) => {
                if (Array.isArray(value)) {
                    // Render files
                    return (
                        <div key={key} className="pl-4">
                            <p className="font-bold">{key}</p>
                            {value.map((file) => (
                                <p key={file} className="pl-2">{file}</p>
                            ))}
                        </div>
                    );
                } else {
                    // Recursively render folders
                    return (
                        <div key={key} className="pl-4">
                            <p className="font-bold cursor-pointer" onClick={() => console.log(`Navigate to ${[...path, key].join('/')}`)}>{key}</p>
                            <Folder data={value} path={[...path, key]} />
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Folder;
