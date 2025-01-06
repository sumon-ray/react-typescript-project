import { useAppDispatch } from "@/app/hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUser,  User } from "@/features/user/userSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddUserModal = () => {
  const form = useForm();
const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  dispatch(addUser(data as User))
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-white">Add user</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription className="sr-only">
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="submit" variant="destructive">
                    Submit
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUserModal;
