import { RiLoader2Fill } from "react-icons/ri";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      <RiLoader2Fill size={50} />
    </div>
  );
};
