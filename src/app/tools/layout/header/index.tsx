interface ILayoutProps {
  title: string;
  subtitle: string;
  description?: string | JSX.Element;

  actions?: JSX.Element;
}

const LayoutHeader = (props: ILayoutProps) => {
  return (
    <div className="w-100 flex flex-col">
      <p className="text-[12px] font-bold uppercase text-green-600 mb-2">
        {props.subtitle}
      </p>
      <h1 className="text-4xl uppercase">{props.title}</h1>

      {props.description && typeof props.description === "string" ? (
        <p className="w-full max-w-[700px] mt-5">{props.description}</p>
      ) : (
        <div className="w-full mt-5">{props.description}</div>
      )}

      {props.actions && <div className="mt-5">{props.actions}</div>}
    </div>
  );
};

export { LayoutHeader };
