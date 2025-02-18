import { useUploadFileMutation } from "@/services/mutation/file";
import { Input } from "./ui/input";
import { FileUploadResponse } from "@/types/file";

interface Props {
  onSuccess: (
    data: FileUploadResponse,
    variables?: FormData,
    context?: unknown
  ) => void;
}

const FileUpload = ({ onSuccess }: Props): React.ReactElement => {
  const uploadFileMutation = useUploadFileMutation();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    uploadFileMutation.mutate(formData, {
      onSuccess: onSuccess,
    });
  };

  return (
    <Input
      id="file-upload"
      type="file"
      onChange={onChange}
      className="border p-2 hidden"
    />
  );
};

export default FileUpload;
