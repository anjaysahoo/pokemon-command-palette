export interface SelectedFilterModel {
    primary: string;
    secondary:
        {
            key: string;
            inputType: string;
            value: string[]
        }[]
}
