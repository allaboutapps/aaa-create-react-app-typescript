import * as React from "react";
import * as RI from "react-intl";
import { IAvailableI18nIds } from "./en";

// helper to ensure that a specific i18n id is available 
export type IDS = keyof IAvailableI18nIds;
export const id = (i18nId: IDS) => i18nId;

// constructor type helper 
// TODO: can go away with TypeScript 2.2 (global constructor type | primitive object type)
type C<T> = new () => T;

// reexpose RI utils with limited available id settings
export const injectIntl = RI.injectIntl;
export const FormattedHTMLMessage: C<RI.FormattedHTMLMessage<IDS>> = RI.FormattedHTMLMessage;
export const FormattedMessage: C<RI.FormattedMessage<IDS>> = RI.FormattedMessage;
export const FormattedPlural: C<RI.FormattedPlural<IDS>> = RI.FormattedPlural;
export const FormattedNumber = RI.FormattedNumber;
export const FormattedDate = RI.FormattedDate;
export const FormattedRelative = RI.FormattedRelative;
export const FormattedTime = RI.FormattedTime;

export type InjectedIntlProps = RI.InjectedIntlProps<IDS>;