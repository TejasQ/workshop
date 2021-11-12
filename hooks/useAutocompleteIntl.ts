import { IntlShape, useIntl } from "react-intl";

export const useAutoCompleteIntl = () =>
  useIntl() as { messages: Dictionary } & IntlShape;
