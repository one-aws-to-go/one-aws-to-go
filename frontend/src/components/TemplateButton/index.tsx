import { ReactComponent as Clouds } from "./Clouds.svg";

const TemplateButton = (props: { children: string }) => {
  return (
    <div className="rounded-3xl bg-primary-container border-4 border-primary w-96">
      <div className="flex flex-col justify-center px-20 py-10">
        <Clouds className="w-full" />
        <p className="text-center align-middle text-2xl text-white">
          {props.children}
        </p>
      </div>
    </div>
  );
};

export default TemplateButton;
