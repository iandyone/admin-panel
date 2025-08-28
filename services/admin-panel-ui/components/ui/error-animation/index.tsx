import { FC } from "react";

import styles from "./styles.module.css";

export const ErrorAnimation: FC = () => {
  return (
    <div className={styles.errorWrapper}>
      <span className={styles.errorPicture} />
    </div>
  );
};
