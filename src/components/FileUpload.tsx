import { usePostApiV1FilesUpload } from "@/api-client/api";
import { Input } from "./ui/input";
import { FileUploadResponse } from "@/types/file";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onSuccess: (
    data: FileUploadResponse,
    variables?: { data: unknown },
    context?: unknown
  ) => void;
}

const FileUpload = ({ onSuccess }: Props): React.ReactElement => {
  const uploadFileMutation = usePostApiV1FilesUpload();
  const { toast } = useToast()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    toast({
      title: "Uploading file...",
      className: "bg-green-600 text-white"
    })

    uploadFileMutation.mutate({ data: file }, {
      onSuccess: onSuccess,
    });
  };

  return (
    <>
      <Input
        id="file-upload"
        type="file"
        onChange={onChange}
        className="border p-2 hidden"
        disabled={uploadFileMutation.isPending}
      />
    </>
  );
};

export default FileUpload;
