import React from "react";
type WrapperContent = {
  heading: string;
  subHeading: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
};
function ContentWrapper({
  heading,
  subHeading,
  children,
  rightContent,
}: WrapperContent) {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
          <p className="text-sm text-muted-foreground">{subHeading}</p>
        </div>
        {rightContent && rightContent}
      </div>
      {children}
    </div>
  );
}

export default ContentWrapper;
