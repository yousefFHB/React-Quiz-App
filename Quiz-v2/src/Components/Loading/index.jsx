import React from "react";
import { Grid } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="fixed top-80 inset-0 z-100 flex items-center justify-center bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent"></div>

      <div className="relative flex flex-col items-center">
        <Grid width={80} height={80} color="#a78bfa" />
        <span className="mt-8 text-zinc-400 font-medium tracking-tight">
          {t("loading.syncing")} <span className="text-violet-400">{t("loading.storefront")}</span>
        </span>
      </div>
    </div>
  );
}
