import { useUpdateUser } from "@/services/mutation/user";
import { useLoggedInUserDetails } from "@/services/queries/user";
import { FileUploadResponse } from "@/types/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FileUpload from "../FileUpload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Loading from "../ui/loading";
import LoadingSpinner from "../ui/loadingSpinner";

const Profile = () => {
  const { data: userDetails, isPending, isError } = useLoggedInUserDetails();
  const userNameForm = useForm<{ userName: string }>({
    resolver: zodResolver(
      z.object({
        userName: z
          .string()
          .min(4, "Username must be at least 4 characters")
          .max(50, "Username must be at most 50 characters"),
      })
    ),
    defaultValues: {
      userName: userDetails?.userName ?? "",
    },
  });

  const updateUserMutation = useUpdateUser();

  if (isPending) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[calc(100vh)] flex-col justify-center items-center gap-8">
        <img className="w-[40vh] mt-48" src="/assets/warning.svg" />
        <p className="text-3xl">Error fetching profile</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<{ userName: string }> = (data) => {
    updateUserMutation.mutate(data);
  };

  const onFileUploadSuccess = (file: FileUploadResponse) => {
    updateUserMutation.mutate({ fileId: file.data.id });
  };

  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <Avatar className="size-40 rounded-full hover:opacity-80 transition-opacity">
            <AvatarImage src={userDetails.file?.url} />
            <AvatarFallback>{userDetails.userName}</AvatarFallback>
          </Avatar>
          <FileUpload onSuccess={onFileUploadSuccess} />
        </label>
      </div>
      <div className="p-2">
        <div className="max-w-sm mb-2">
          <p className="mb-1">Email</p>
          <div className="border-[1px] px-3 py-[6px] rounded-md">
            email@example.com
          </div>
        </div>
        <Form {...userNameForm}>
          <form
            onSubmit={userNameForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={userNameForm.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl className="mb-2 max-w-sm w-auto">
                    <Input
                      className="max-w-sm w-96"
                      placeholder="Enter Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-20"
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? <LoadingSpinner /> : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
