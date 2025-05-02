import type { MetaFunction } from "react-router";

export interface LoaderArgs {
  request: Request;
  params: Record<string, string>;
}

export interface ActionArgs extends LoaderArgs {
  formData: FormData;
}

export interface Route {
  LoaderArgs: LoaderArgs;
  ActionArgs: ActionArgs;
  MetaFunction: MetaFunction;
} 