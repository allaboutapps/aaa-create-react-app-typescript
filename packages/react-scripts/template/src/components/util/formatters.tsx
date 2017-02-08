import * as React from "react";

import * as i18n from "../../i18n/util";

type ISO8601DateString = string | String;

export function IsoDate(props: { date: ISO8601DateString }) {
    return (
        <i18n.FormattedDate
            value={new Date(props.date as string)}
            year="numeric"
            month="long"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
        />
    );
}