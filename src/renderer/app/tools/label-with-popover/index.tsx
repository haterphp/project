import { useMemo, useState } from "react";

interface ILabelWithPopoverProps {
  title: string;
  content: {
    header: string;
    body: JSX.Element;
  };
}

const LabelWithPopover = (props: ILabelWithPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const mouseProps = {
    onMouseOver: () => setIsVisible(true),
    onMouseOut: () => setIsVisible(false),
  };

  const popoverClassname = useMemo(() => `
        absolute top-0 ml-[80px] z-10 
        text-sm text-gray-500 transition-opacity duration-300 bg-white border 
        border-gray-200 rounded-lg shadow-sm ${isVisible ? '' : 'invisible'}
  `, [isVisible])

  return (
    <div className="w-[350px] relative flex">
      <div
        data-popover
        id="popover-default"
        role="tooltip"
        className={popoverClassname}
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
          <h3 className="font-semibold text-gray-900">
            {props.content.header}
          </h3>
        </div>
        <div className="w-full px-2 py-3">{props.content.body}</div>
        <div data-popper-arrow></div>
      </div>
      <p
        data-popover-target="popover-default"
        className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded w-[70px] text-center"
        {...mouseProps}
      >
        {props.title}
      </p>
    </div>
  );
};

export { LabelWithPopover };
