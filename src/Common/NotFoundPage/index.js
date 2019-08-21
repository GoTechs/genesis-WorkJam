/**
 *
 * NotFoundPage
 * This is the component that will show when you have a 404
 */

import React from "react";
import { Trans, withNamespaces } from "react-i18next";

function NotFoundPage(props) {
  return (
    <div>
      <p>
        <Trans i18nKey="PAGE_NOT_FOUND">
          The page you're looking for doesn't exist.
        </Trans>
      </p>
    </div>
  );
}

export default withNamespaces("translation")(NotFoundPage);
