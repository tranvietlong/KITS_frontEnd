import { ConfigProvider } from "antd";
import PropTypes from "prop-types";

export const BASE_URL = import.meta.env.BASE_URL;

export const typeToken = {
  COLORPRIMARY: "colorPrimary",
  COLORBGCONTAINER: "colorBGContainer",
}

Config.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.object,
  locale: PropTypes.object,
};

function Config({ locale, theme, children }) {
  return (
    <ConfigProvider locale={locale} theme={theme}>
      {children}
    </ConfigProvider>
  );
}

export default Config;
