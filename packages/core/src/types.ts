import React from "react";

export type IconComponent = any;

export type IconsMapType<IconNames extends string> = Record<
  IconNames,
  IconComponent
>;

export interface IconsetBaseProps<IconNames extends string> {
  name: IconNames;
  width?: string | number;
  height?: string | number;
  className?: string | number;
  style?: string | object;
  id?: string;
  ["test-id"]?: string;
}

export type IconsetProps<IconNames extends string> =
  | (React.ReactSVGElement & IconsetBaseProps<IconNames>)
  | React.ReactElement<IconsetBaseProps<IconNames>>;

export type CreateIconsetOptions<IconNames extends string> = {
  familyName: string;
  map: IconsMapType<IconNames>;
};

export type CreateIconOptions = {
  name: string;
  width: number;
  height: number;
  path: string;
}