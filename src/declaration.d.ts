declare module "*.module.css";
declare module "*.module.scss";
declare module "*.png" {
    const value: string;
    export default value;
};
declare module "*.jpg" {
    const value: any;
    export = value;
};

declare module 'pagedjs';