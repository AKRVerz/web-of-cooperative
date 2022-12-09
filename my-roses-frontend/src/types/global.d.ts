import React, { FunctionComponent } from 'react';

declare global {
  export type ReactFC<Props = {}> = React.FC<
    Props & {
      children?: React.ReactNode;
    }
  >;
}
