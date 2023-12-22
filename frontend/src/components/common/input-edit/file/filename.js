import React from 'react';

function InputFileFilename({ value }) {
  const { filename } = value;

  const onClick = () => {
    window.open(`http://localhost/api/collection/file/file/${filename}`, '_blank');
  };
  if (!filename) return null;
  return (
    <div className="flex ml-2 gap-1">
      <div>{filename}</div>
      <div className="default-link" onClick={onClick}>
        [預覽]
      </div>
    </div>
  );
}

export default InputFileFilename;
