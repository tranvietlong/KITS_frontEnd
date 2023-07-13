import "./Pomodoro.css";
import { useState, useEffect } from "react";
import { Modal, InputNumber, Space, Typography } from "antd";

const { Text } = Typography;

const WORKING_TIME = 120;
const BREAK_TIME = 60;

function Pomodoro() {
  const [now, setNow] = useState(new Date());
  const [isWork, setIsWork] = useState(true);
  const [timeDown, setTimeDown] = useState(WORKING_TIME);
  const [start, setStart] = useState(false);
  const [setting, setSetting] = useState(false);
  const [settings, setSettings] = useState({
    workTime: WORKING_TIME,
    restTime: BREAK_TIME,
  });

  useEffect(() => {
    let startTimeOut = setTimeout(() => {
      setNow(new Date());
      if (timeDown > 0 && start) {
        setTimeDown(timeDown - 1);
      } else {
        if (isWork && start) {
          setIsWork(!isWork);
          setTimeDown(settings.restTime);
        } else if (!isWork && start) {
          setIsWork(!isWork);
          setTimeDown(settings.workTime);
        } else if (!start) {
          return () => clearTimeout(startTimeOut);
        }
      }
    }, 1000);
  }, [now, isWork, timeDown, start, settings]);

  const convertTimeStr = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const onReset = () => {
    if (isWork) {
      setTimeDown(settings.workTime);
    } else {
      setTimeDown(settings.restTime);
    }
  };

  const stylesWork = {
    backgroundColor: "#C25C5C",
  };
  const stylesRest = {
    backgroundColor: "#4F9296",
  };

  const styleTextSetting = {
    display: "inline-block",
    width: 170,
  };

  const handleOk = () => {
    setSetting(false);
    setTimeDown(settings.workTime);
    setIsWork(true);
  };

  const handleCancel = () => {
    setSetting(false);
  };

  const handleChangeWorkTime = (value) => {
    setSettings({ ...settings, workTime: value * 60 });
  };

  const handleChangeRestTime = (value) => {
    setSettings({ ...settings, restTime: value * 60 });
  };

  return (
    <div className={`container ${isWork ? "working" : "resting"}`}>
      <div className="shadow" style={isWork ? stylesWork : stylesRest}>
        <h1>{now.toLocaleTimeString()}</h1>
        <div className="title">{isWork ? "Working Time" : "Break Time"}</div>
        <div className="timeLeft">{convertTimeStr(timeDown)}</div>
        <button
          className={`btn ${isWork ? "colorTextWork" : "colorTextRest"}`}
          type="button"
          onClick={() => setStart(!start)}
        >
          {start ? "Pause" : "Start"}
        </button>
        <button
          className={`btn ${isWork ? "colorTextWork" : "colorTextRest"}`}
          type="button"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          className={`btn ${isWork ? "colorTextWork" : "colorTextRest"}`}
          type="button"
          onClick={() => setSetting(!setting)}
        >
          Setting
        </button>
      </div>

      <Modal
        title="Settings"
        open={setting}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          <Space>
            <Text strong style={styleTextSetting}>
              Working time (minutes):
            </Text>
            <InputNumber min={1} max={60} onChange={handleChangeWorkTime} />
          </Space>
          <Space>
            <Text strong style={styleTextSetting}>
              Resting time (minutes):
            </Text>
            <InputNumber min={1} max={60} onChange={handleChangeRestTime} />
          </Space>
        </Space>
      </Modal>
    </div>
  );
}

export default Pomodoro;
