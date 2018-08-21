export interface IFormsyComponentProps {
    name: string;
    validationError?: string | ((value: string) => string);
    validations?: string;
    required?: boolean;
    // tslint:disable-next-line:no-reserved-keywords
    type?: string;
    setValue(value: any): void;
    getValue(): any;
    getErrorMessage(): string;
}
