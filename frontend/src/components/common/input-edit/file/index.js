import { MuiFileInput } from 'mui-file-input';
import { useInputFile } from './hooks';
import { AttachFile } from '@mui/icons-material';
import InputFileFilename from './filename';

function InputFile({ setInputs, field, value, config }) {
  const { accept, file, setFile } = useInputFile({
    defaultValue: value,
    config,
    setInputs,
    field
  });

  return (
    <div className="flex flex-col gap-1 w-full">
      <MuiFileInput
        onChange={(newFile) => {
          setFile(newFile);
        }}
        fullWidth
        size="small"
        name={field}
        value={file}
        InputProps={{
          inputProps: {
            accept
          },
          startAdornment: <AttachFile />
        }}
      />
      <InputFileFilename value={value} />
      {/* 
      {value?.mimetype === 'image/png' ? (
        <Image value={value} file={file} touched={touched} setFile={setFile} setTouched={setTouched} />
      ) : null} */}
    </div>
  );
}

// const Image = ({ value, file, touched, setFile, setTouched }) => {
//   const image = !touched ? value : file;
//   if (!image) return null;
//   const src = `${domain}file/${image.name}`;
//   return (
//     <To className="flex flex-col items-center max-w-[200px] relative" url={src} toNew withoutDomain>
//       <div
//         className="absolute top-0 right-0 bg-zinc-200/50 rounded"
//         onClick={(e) => {
//           e.preventDefault();
//           setTouched(true);
//           setFile(null);
//         }}
//       >
//         <DeleteForever />
//       </div>
//       <img src={src} alt="preview" />
//       <div className="">
//         {image.name} - {convertFileSize(image.size)}
//       </div>
//     </To>
//   );
// };

export default InputFile;
