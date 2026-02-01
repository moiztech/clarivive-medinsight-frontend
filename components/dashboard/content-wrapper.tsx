import React from "react";
type WrapperContent = {
  heading: string;
  subHeading: string;
  children?: React.ReactNode;
};
function ContentWrapper({ heading, subHeading, children }: WrapperContent) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
        <p className="text-sm text-muted-foreground">{subHeading}</p>
      </div>
      {children}
    </div>
  );
}

export default ContentWrapper;
