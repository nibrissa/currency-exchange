import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>-404-</div>
      <Link to={'/'}>{t("back")}</Link>
    </div>
  );
};

export default NotFound;