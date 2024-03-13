declare module "*.png" {
    const value: any;
    export = value;
 }
 declare module "*.mp3" {
    const value: any;
    export = value;
 }

 // Use type safe message keys with `next-intl`
type Messages = typeof import('./dictionaries/en.json');
declare interface IntlMessages extends Messages {}