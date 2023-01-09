import React from 'react';
import { Slot } from '@uniformdev/canvas-react';
import classNames from 'classnames';

export enum BackgroundTypes {
  White = 'White',
  Dark = 'Dark',
  LightGray = 'LightGray',
}

export enum PaddingSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  None = 'None',
}

const PaddingTopClasses = {
  [PaddingSize.Large]: 'pt-16 md:pt-28',
  [PaddingSize.Medium]: 'pt-10 lg:pt-20',
  [PaddingSize.Small]: 'pt-6 lg:pt-8',
  [PaddingSize.None]: '',
};

const PaddingBottomClasses = {
  [PaddingSize.Large]: 'pb-16 md:pb-28',
  [PaddingSize.Medium]: 'pb-10 lg:pb-20',
  [PaddingSize.Small]: 'pb-6 lg:pb-8',
  [PaddingSize.None]: '',
};

const BackgroundClasses = {
  [BackgroundTypes.White]: 'bg-white text-black',
  [BackgroundTypes.LightGray]: 'bg-light_gray text-black',
  [BackgroundTypes.Dark]: 'bg-black text-white',
};

interface Props {
  backgroundType?: BackgroundTypes;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  children: React.ReactNode;
  className?: string;
}

const BackgroundWrapper: React.FC<Required<Props>> = ({
  backgroundType,
  paddingTop,
  paddingBottom,
  children,
  className,
}) =>
  BackgroundTypes[backgroundType] ? (
    <div
      className={classNames(
        BackgroundClasses[backgroundType],
        PaddingTopClasses[paddingTop],
        PaddingBottomClasses[paddingBottom],
        className
      )}
    >
      {children}
    </div>
  ) : (
    (children as any)
  );

const Container: React.FC<Props> = ({
  backgroundType = BackgroundTypes.White,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  children,
  className = '',
}) => (
  <BackgroundWrapper
    paddingTop={paddingTop}
    backgroundType={backgroundType}
    paddingBottom={paddingBottom}
    className={className}
  >
    <div className="px-8 m-auto max-w-[1136px]">{children || <Slot name="content" />}</div>
  </BackgroundWrapper>
);

export default Container;
