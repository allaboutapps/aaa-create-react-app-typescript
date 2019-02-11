import hoistNonReactStatic from "hoist-non-react-statics";
import * as RI from "react-intl";
import { IAvailableI18nIds } from "./en";

// helper to ensure that a specific i18n id is available
export type IDS = keyof IAvailableI18nIds;
export const id = (i18nId: IDS) => i18nId;

// constructor type helper
type C<T> = new () => T;

// proxy injectIntl through hoist-non-react-statics
// react-intl is insane and not complying to conventions in the ecosystem, thus we handle this here directly.
// see https://github.com/yahoo/react-intl/issues/196
// see https://github.com/yahoo/react-intl/pull/433
// see https://github.com/mridgway/hoist-non-react-statics
export function injectIntl(WrappedComponent: any) {
    const InjectIntl = RI.injectIntl(WrappedComponent);

    return hoistNonReactStatic(InjectIntl, WrappedComponent);
}

// reexpose RI utils with limited available id settings
export const FormattedHTMLMessage = RI.FormattedHTMLMessage as C<RI.FormattedHTMLMessage<IDS>>;
export const FormattedMessage = RI.FormattedMessage as C<RI.FormattedMessage<IDS>>;
export const FormattedPlural = RI.FormattedPlural as C<RI.FormattedPlural<IDS>>;
export const FormattedNumber = RI.FormattedNumber;
export const FormattedDate = RI.FormattedDate;
export const FormattedRelative = RI.FormattedRelative;
export const FormattedTime = RI.FormattedTime;

export type InjectedIntl = RI.InjectedIntl<IDS>;
export type InjectedIntlProps = RI.InjectedIntlProps<IDS>;

export type TranslatorFunction = (stringId: IDS, values?: Object) => string;

/** * Given an InjectedIntl object return a function that can be used for getting
 * internationalized string constants with less typing.
 *
 *  Usage: __ = bindStr(this.props.intl);
 *  console.log(__("string-key"));
 */
export function bindStr(intl?: RI.InjectedIntl<IDS>) {
    if (intl) {
        return (stringId: IDS, values?: Object) => intl.formatMessage({ id: stringId }, values);
    } else {
        return (stringId: IDS) => stringId;
    }
}
