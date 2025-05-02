import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export namespace Route {
  export interface LoaderArgs extends LoaderFunctionArgs {}
  export interface ActionArgs extends ActionFunctionArgs {}
  
  export interface LoaderData {
    products: Array<any>; // Replace 'any' with your product type
  }
  
  export interface ActionData {
    // Add action data types here
  }
  
  export interface ComponentProps {
    loaderData: LoaderData;
    actionData?: ActionData;
  }
} 