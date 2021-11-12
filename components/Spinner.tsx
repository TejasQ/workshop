import { FunctionComponent } from "react";
import styles from "../css/Spinner.module.css";

type Props = {
  /** # Button
   * ## Subheading
   *
   * ![image](https://media4.giphy.com/media/sJWNLTclcvVmw/giphy.gif?cid=790b7611315de188e69547ffdfd30f4fb2c5c95676082867&rid=giphy.gif&ct=g)
   *
   * I like big spinners and I cannot lie. lorem ipsum
   */
  size?: string;
};

export const Spinner: FunctionComponent<Props> = ({ size = 24 }) => (
  <>
    <style jsx>
      {`
        .loader,
        .loader:after {
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
        }
      `}
    </style>
    <div className={styles.loader + " loader"} />
  </>
);
