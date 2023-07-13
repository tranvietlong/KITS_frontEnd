import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Layout,
  Typography,
  Menu,
  Button,
  Space,
  Image,
  Avatar,
  Select,
  ColorPicker,
  Drawer,
  Popover,
  Badge,
  Spin,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ClockCircleOutlined,
  CalculatorOutlined,
  AppstoreOutlined,
  HomeOutlined,
  TransactionOutlined,
  SettingOutlined,
  HighlightOutlined,
  BellOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "./config";
import enUS from "antd/locale/en_US";
import vi_VN from "antd/locale/vi_VN";
import ko_KR from "antd/locale/ko_KR";
import { KR, VN, GB } from "country-flag-icons/react/3x2";
import Config, { typeToken } from "./config";

const { Header, Content, Sider, Footer } = Layout;
const { Text, Title } = Typography;

const menu = [
  {
    key: `${BASE_URL}/home`,
    label: <Link to={`${BASE_URL}/home`}>Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: `${BASE_URL}/quotes`,
    label: <Link to={`${BASE_URL}/quotes`}>Quotes</Link>,
    icon: <HighlightOutlined />,
  },
  {
    key: `${BASE_URL}/unitConverter`,
    label: <Link to={`${BASE_URL}/unitConverter`}>Unit Converter</Link>,
    icon: <TransactionOutlined />,
  },
  {
    key: `${BASE_URL}/chessboard`,
    label: <Link to={`${BASE_URL}/chessboard`}>Chess Board</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: `${BASE_URL}/calculator`,
    label: <Link to={`${BASE_URL}/calculator`}>Calculator</Link>,
    icon: <CalculatorOutlined />,
  },
  {
    key: `${BASE_URL}/pomodoro`,
    label: <Link to={`${BASE_URL}/pomodoro`}>Pomodoro</Link>,
    icon: <ClockCircleOutlined />,
  },
];

const flag = {
  height: 13,
};

var selectLanguages = [
  {
    value: "vi_VN",
    label: (
      <Space>
        <VN title="Vietnamese" style={flag} />
        VN
      </Space>
    ),
  },
  {
    value: "enUS",
    label: (
      <Space>
        <GB title="United States" style={flag} />
        US
      </Space>
    ),
  },
  {
    value: "ko_KR",
    label: (
      <Space>
        <KR title="Korean" style={flag} />
        KR
      </Space>
    ),
  },
];

const inforUser = (
  <Space direction="vertical" style={{ padding: 10 }}>
    <Text>
      <Text strong>Name: </Text> Trần Việt Long
    </Text>
    <Text>
      <Text strong>DOB: </Text> 16/09/2000
    </Text>
    <Text>
      <Text strong>Major: </Text> Management Information System
    </Text>
  </Space>
);

const loading = (
  <LoadingOutlined
    style={{
      fontSize: 20,
    }}
    spin
  />
);

const alertNotification = <Spin indicator={loading} size="large" />;

function App() {
  const [titleComponent, setTitleComponent] = useState("Home");
  const [collapsed, setCollapsed] = useState(true);
  const [locale, setLocale] = useState(vi_VN);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [colorBgContainer, setColorBgContainer] = useState("#fff");
  const [colorPrimary, setColorPrimary] = useState("#1890ff");
  const [themeObj, setThemeObj] = useState({
    token: {
      colorPrimary: colorPrimary,
      colorBgContainer: colorBgContainer,
    },
  });

  let location = useLocation();

  const handleColorChange = (value, type) => {
    let colorBg = colorBgContainer;
    let colorPri = colorPrimary;
    if (type === typeToken.COLORBGCONTAINER) {
      colorBg = value.toHexString();
      setColorBgContainer(colorBg);
    } else if (type === typeToken.COLORPRIMARY) {
      colorPri = value.toHexString();
      setColorPrimary(colorPri);
    }

    const newTheme = {
      ...themeObj,
      token: {
        ...themeObj.token,
        colorPrimary: colorPri,
        colorBgContainer: colorBg,
      },
    };
    setThemeObj(newTheme);
  };

  const resetTheme = () => {
    let colorBg = "#fff";
    let colorPri = "#1890ff";
    setColorBgContainer(colorBg);
    setColorPrimary(colorPri);
    setThemeObj({
      token: {
        colorBgContainer: colorBg,
        colorPrimary: colorPri,
      },
    });
  };

  const handleChangeLang = (value) => {
    if (value === "vi_VN") {
      setLocale(vi_VN);
    } else if (value === "enUS") {
      setLocale(enUS);
    } else if (value === "ko_KR") {
      setLocale(ko_KR);
    }
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    let pathName = location.pathname;
    if (pathName === `${BASE_URL}/home`) {
      setTitleComponent("Calendar");
    } else if (pathName === `${BASE_URL}/quotes`) {
      setTitleComponent("Quotes");
    } else if (pathName === `${BASE_URL}/unitConverter`) {
      setTitleComponent("Unit Converter");
    } else if (pathName === `${BASE_URL}/chessboard`) {
      setTitleComponent("Chessboard");
    } else if (pathName === `${BASE_URL}/calculator`) {
      setTitleComponent("Calculator");
    } else if (pathName === `${BASE_URL}/pomodoro`) {
      setTitleComponent("Pomodoro");
    }
  }, [location]);
  return (
    <>
      <Config locale={locale} theme={themeObj}>
        <Layout>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={styles.boxShadow}
          >
            <Link to={`${BASE_URL}/home`} style={styles.logo}>
              <Image
                width={collapsed ? 50 : 100}
                style={{ transition: "width 3s" }}
                src="./assets/images/kits.png"
                preview={false}
              />
            </Link>
            <Menu
              style={styles.menu}
              mode="inline"
              defaultSelectedKeys={location.pathname}
              items={menu}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                ...styles.header,
                ...styles.boxShadow,
                backgroundColor: colorBgContainer,
              }}
            >
              <Space style={styles.collapse}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                />
                <Title level={4} style={styles.titleComponent}>
                  {titleComponent}
                </Title>
              </Space>
              <Space style={styles.rightHeader}>
                <Select
                  defaultValue={"vi_VN"}
                  style={styles.selectLanguages}
                  onChange={handleChangeLang}
                  options={selectLanguages}
                />
                <Popover content={alertNotification}>
                  <Badge count={5}>
                    <BellOutlined style={styles.badge} />
                  </Badge>
                </Popover>

                <Popover content={inforUser} title="User Information">
                  <Avatar
                    style={styles.avatar}
                    size={31}
                    src="./assets/images/longUser.jpg"
                  />
                </Popover>
              </Space>
            </Header>
            <Content style={styles.content}>
              <Outlet />
            </Content>
            <Footer style={styles.footer}>
              Mini App &#169; 2023 Created by Trần Việt Long
            </Footer>
          </Layout>
          <Space style={styles.drawer}>
            <Button
              type="primary"
              onClick={showDrawer}
              style={styles.btnDrawer}
            >
              <SettingOutlined spin={true} />
              <Text strong={true} style={styles.textDrawer}>
                Setting
              </Text>
            </Button>
            <Drawer
              title="Theme Customize"
              placement="right"
              onClose={onCloseDrawer}
              open={openDrawer}
            >
              <Space direction="vertical">
                <Space direction="vertical">
                  <Title level={5}>Background</Title>
                  <Space>
                    <ColorPicker
                      value={themeObj.token.colorBgContainer}
                      onChange={(value) =>
                        handleColorChange(value, typeToken.COLORBGCONTAINER)
                      }
                    />
                    <Text>{themeObj.token.colorBgContainer}</Text>
                  </Space>
                </Space>
                <Space direction="vertical">
                  <Title level={5}>Color Primary</Title>
                  <Space>
                    <ColorPicker
                      value={themeObj.token.colorPrimary}
                      onChange={(value) =>
                        handleColorChange(value, typeToken.COLORPRIMARY)
                      }
                    />
                    <Text>{themeObj.token.colorPrimary}</Text>
                  </Space>
                  <Space direction="vertical">
                    <Button onClick={resetTheme}>Reset Theme</Button>
                  </Space>
                </Space>
              </Space>
            </Drawer>
          </Space>
        </Layout>
      </Config>
    </>
  );
}

const styles = {
  boxShadow: {
    border: "1px solid #f3f5f9",
    borderLeft: "none",
    boxShadow:
      "0 1px 1px rgba(33,40,48,.01), 0 4px 4px rgba(33,40,48,.01), 0 16px 16px rgba(33,40,48,.01)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px 5px 5px",
  },
  btnCollapse: {
    width: 64,
    height: 64,
  },
  titleComponent: {
    marginBottom: 5,
  },
  selectLanguages: {
    width: 90,
    marginRight: 10,
  },
  avatar: {
    margin: "-5px 10px 0 10px",
    border: "1px solid #e9ebed",
    padding: 4,
  },
  menu: {
    backgroundColor: "transparent",
    borderInlineEnd: "none",
  },
  content: {
    padding: "20px",
    backgroundColor: "#FBFCFE",
    minHeight: "calc(100vh - 69px - 64px)",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  drawer: {
    position: "fixed",
    zIndex: 999,
    top: "47%",
    right: 0,
    cursor: "pointer",
    writingMode: "vertical-rl",
  },
  textDrawer: {
    color: "#fff",
  },
  btnDrawer: {
    width: 45,
    height: 100,
    marginRight: -10,
  },
  badge: {
    fontSize: 17,
  },
  footer: {
    textAlign: "center",
  },
};

export default App;
