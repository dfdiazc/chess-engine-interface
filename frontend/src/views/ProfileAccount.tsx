import React, { useMemo } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "features/auth/authApiSlice";
import * as yup from "yup";
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import { AppDispatch } from "app/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ProfileAccount = () => {
  const { data: profileData } = useGetProfileQuery();
  const [update, { isLoading }] = useUpdateProfileMutation();
  interface AccountFormData {
    email: string,
    first_name: string;
    last_name: string;
  }
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string(),
        last_name: yup.string(),
      }),
    []
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues : {"email": profileData?.email}
  });
  const onSubmit = handleSubmit(async (data: AccountFormData) => {
    try {
      const response = await update(data).unwrap();
    } catch (error: any) {
      const errors = error.data;
      console.log(errors);
    }
  });
  return (
    <div className="px-3 flex flex-col h-full">
      <div className="pt-10 flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="bg-white/80 p-5 rounded-full w-fit self-center">
            <IconContext.Provider
              value={{ className: "h-10 w-10 text-gray-500 m-1" }}
            >
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <span className="font-roboto font-normal text-sm text-flamingo-100 hover:underline text-center self-center">
            Change profile picture
          </span>
        </div>
        <form className="flex flex-col gap-3 p-3 mt-5" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-1 bg-[#2D3033] rounded-lg px-5 py-2 justify-center">
            <span className="font-roboto font-normal text-xs text-white/80 select-none">
              Email
            </span>
            <input className="font-roboto font-light text-sm bg-[#2D3033] text-white/80 outline-none" {...register("email")}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAccount;
