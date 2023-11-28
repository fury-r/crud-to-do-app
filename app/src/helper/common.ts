export const onChange = (
  e: any,
  setData: React.Dispatch<React.SetStateAction<any>>
) => {
  setData((prev: any) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
