import { useState, useEffect } from "react";
import axios from "axios";
import {
  Space,
  Typography,
  InputNumber,
  Pagination,
  Card,
  Col,
  Row,
} from "antd";

const { Title, Text } = Typography;

const Quotes = () => {
  const [numQuotes, setNumQuotes] = useState(10);
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getQuotes = async (page) => {
      try {
        const response = await axios.post("http://localhost:3000/quotes", {
          numQuotes: numQuotes,
        });
        const startIdx = (page - 1) * 6;
        const endIdx = startIdx + 6;
        const quotesForPage = response.data.slice(startIdx, endIdx);
        setQuotes(quotesForPage);
        setTotalPages(Math.ceil(response.data.length / numQuotes));
      } catch (e) {
        console.error(e);
      }
    };

    getQuotes(currentPage);
  }, [currentPage, numQuotes]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNumChange = (value) => {
    setNumQuotes(value);
  };

  return (
    <Space direction="vertical" style={styles.container}>
      <Space style={styles.content} direction="vertical">
        <Space style={styles.inputQuoteChange}>
          <Title level={5} type="secondary">
            Number of quotes:{" "}
          </Title>
          <InputNumber
            min={1}
            max={25}
            defaultValue={numQuotes}
            onChange={handleNumChange}
          />
        </Space>
        <Row gutter={16} align="middle">
          {quotes.map((item, idx) => (
            <Col key={idx} span={11} style={styles.colCard}>
              <Card bordered title={item.author}>
                <Text> {item.quote} </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
      <Pagination
        hideOnSinglePage
        current={currentPage}
        total={totalPages * numQuotes}
        pageSize={6}
        onChange={handlePageChange}
      />
    </Space>
  );
};

const styles = {
  container: {
    textAlign: "center",
    width: "100%",
  },
  content: {
    minHeight: "calc(90vh - 64px - 70px",
  },
  inputQuoteChange: {
    float: "left",
    marginBottom: 20
  },
  colCard: {
    margin: 15,
  },
};

export default Quotes;
